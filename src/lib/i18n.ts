"use client";

import { useSyncExternalStore } from "react";

export type Language = "en" | "ru" | "cn";

const storageKey = "nmc_lang";
const languageEvent = "nmc-language-change";
let memoryLanguage: Language | null = null;

type TranslationKey =
  | "home"
  | "products"
  | "aboutUs"
  | "whatsAppInquiry"
  | "factoryDirectCompressionGarments"
  | "homeHeroDescription"
  | "getQuoteOnWhatsApp"
  | "viewProducts"
  | "whyBuyersChooseUs"
  | "productCategories"
  | "simpleCustomOrderSupport"
  | "reliableFactorySupport"
  | "compressionGarmentCategories"
  | "productsIntro"
  | "viewDetails"
  | "needCustomSize"
  | "askOnWhatsApp"
  | "backToProducts"
  | "sendInquiry"
  | "productOverview"
  | "keyFeatures"
  | "applications"
  | "simpleCustomOrder"
  | "orderInformation"
  | "askForCatalog"
  | "aboutNovaMedixCustom"
  | "whoWeAre"
  | "ourStrengths"
  | "productionCapability"
  | "qualityFocus"
  | "builtForB2BCooperation"
  | "contactUs";

export const translations: Record<TranslationKey, Record<Language, string>> = {
  home: { en: "Home", ru: "Главная", cn: "首页" },
  products: { en: "Products", ru: "Продукты", cn: "产品" },
  aboutUs: { en: "About Us", ru: "О нас", cn: "关于我们" },
  whatsAppInquiry: { en: "WhatsApp Inquiry", ru: "Запрос в WhatsApp", cn: "WhatsApp 咨询" },
  factoryDirectCompressionGarments: {
    en: "Factory Direct Compression Garments",
    ru: "Компрессионные изделия напрямую с фабрики",
    cn: "工厂直供压力服",
  },
  homeHeroDescription: {
    en: "Ready styles, custom-made service, and OEM support for global buyers, clinics, distributors and wholesalers.",
    ru: "Готовые модели, индивидуальный пошив и OEM-поддержка для покупателей, клиник, дистрибьюторов и оптовиков.",
    cn: "为全球买家、诊所、经销商和批发商提供现货款式、定制服务和 OEM 支持。",
  },
  getQuoteOnWhatsApp: { en: "Get Quote on WhatsApp", ru: "Получить цену в WhatsApp", cn: "WhatsApp 获取报价" },
  viewProducts: { en: "View Products", ru: "Смотреть продукты", cn: "查看产品" },
  whyBuyersChooseUs: { en: "Why Buyers Choose Us", ru: "Почему покупатели выбирают нас", cn: "买家为何选择我们" },
  productCategories: { en: "Product Categories", ru: "Категории продуктов", cn: "产品分类" },
  simpleCustomOrderSupport: { en: "Simple Custom Order Support", ru: "Простая поддержка заказов", cn: "简易定制订单支持" },
  reliableFactorySupport: { en: "Reliable Factory Support", ru: "Надежная фабричная поддержка", cn: "可靠工厂支持" },
  compressionGarmentCategories: {
    en: "Compression Garment Categories",
    ru: "Категории компрессионных изделий",
    cn: "压力服分类",
  },
  productsIntro: {
    en: "Explore our ready styles and custom-made options for global buyers.",
    ru: "Изучите готовые модели и варианты индивидуального заказа для глобальных покупателей.",
    cn: "探索面向全球买家的现货款式和定制选项。",
  },
  viewDetails: { en: "View Details", ru: "Подробнее", cn: "查看详情" },
  needCustomSize: { en: "Need a custom size?", ru: "Нужен индивидуальный размер?", cn: "需要定制尺寸？" },
  askOnWhatsApp: { en: "Ask on WhatsApp", ru: "Спросить в WhatsApp", cn: "WhatsApp 咨询" },
  backToProducts: { en: "Back to Products", ru: "Назад к продуктам", cn: "返回产品" },
  sendInquiry: { en: "Send Inquiry", ru: "Отправить запрос", cn: "发送询盘" },
  productOverview: { en: "Product Overview", ru: "Обзор продукта", cn: "产品概览" },
  keyFeatures: { en: "Key Features", ru: "Ключевые особенности", cn: "核心特点" },
  applications: { en: "Applications", ru: "Применение", cn: "应用场景" },
  simpleCustomOrder: { en: "Simple Custom Order", ru: "Простой индивидуальный заказ", cn: "简易定制订单" },
  orderInformation: { en: "Order Information", ru: "Информация о заказе", cn: "订单信息" },
  askForCatalog: { en: "Ask for Catalog", ru: "Запросить каталог", cn: "索取目录" },
  aboutNovaMedixCustom: { en: "About NovaMedix Custom", ru: "О NovaMedix Custom", cn: "关于 NovaMedix Custom" },
  whoWeAre: { en: "Who We Are", ru: "Кто мы", cn: "我们是谁" },
  ourStrengths: { en: "Our Strengths", ru: "Наши преимущества", cn: "我们的优势" },
  productionCapability: { en: "Production Capability", ru: "Производственные возможности", cn: "生产能力" },
  qualityFocus: { en: "Quality Focus", ru: "Фокус на качестве", cn: "质量重点" },
  builtForB2BCooperation: { en: "Built for B2B Cooperation", ru: "Создано для B2B-сотрудничества", cn: "为 B2B 合作而建" },
  contactUs: { en: "Contact Us", ru: "Связаться с нами", cn: "联系我们" },
};

function normalizeLanguage(value?: string | null): Language {
  const normalized = value?.toLowerCase();

  if (normalized?.startsWith("ru")) return "ru";
  if (normalized?.startsWith("zh") || normalized === "cn") return "cn";
  return "en";
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  if (memoryLanguage) return memoryLanguage;

  const stored = safeStorageGet();
  return stored ? normalizeLanguage(stored) : normalizeLanguage(window.navigator?.language);
}

export function translate(key: TranslationKey, language: Language) {
  return translations[key]?.[language] || translations[key]?.en || key;
}

export function setLanguage(language: Language) {
  memoryLanguage = language;
  safeStorageSet(language);
  window.dispatchEvent(new CustomEvent(languageEvent, { detail: language }));
}

function safeStorageGet() {
  try {
    return window.localStorage?.getItem(storageKey);
  } catch {
    return null;
  }
}

function safeStorageSet(language: Language) {
  try {
    window.localStorage?.setItem(storageKey, language);
  } catch {
    // Some embedded browsers disable storage. The in-memory fallback still keeps the UI responsive.
  }
}

export function useLanguage() {
  const language = useSyncExternalStore<Language>(
    (onStoreChange) => {
      window.addEventListener(languageEvent, onStoreChange);
      window.addEventListener("storage", onStoreChange);

      return () => {
        window.removeEventListener(languageEvent, onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    getInitialLanguage,
    () => "en",
  );

  return {
    language,
    setLanguage,
    t: (key: TranslationKey) => translate(key, language),
  };
}

export type { TranslationKey };
