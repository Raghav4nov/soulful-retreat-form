import type { Locale } from "@/i18n/types";

export type Option = { value: string; label: Record<Locale, string> };
export type LocalizedOption = { value: string; label: string };

export function localizeOptions(options: Option[], locale: Locale): LocalizedOption[] {
  return options.map((option) => ({ value: option.value, label: option.label[locale] }));
}

// Step 3
export const INTENTION_OPTIONS: Option[] = [
  { value: "rest_recovery", label: { en: "Rest & recovery", hi: "आराम और रिकवरी" } },
  { value: "emotional_healing", label: { en: "Emotional healing", hi: "भावनात्मक उपचार" } },
  {
    value: "self_awareness",
    label: { en: "Deepening self-awareness", hi: "आत्म-जागरूकता को गहरा करना" },
  },
  { value: "connecting_nature", label: { en: "Connecting with nature", hi: "प्रकृति से जुड़ाव" } },
  {
    value: "community",
    label: { en: "Meeting like-minded people", hi: "समान विचारधारा वाले लोगों से मिलना" },
  },
  { value: "spiritual_growth", label: { en: "Spiritual growth", hi: "आध्यात्मिक विकास" } },
];

export const EXPERIENCE_OPTIONS: Option[] = [
  { value: "yoga_meditation", label: { en: "Yoga & meditation", hi: "योग और ध्यान" } },
  { value: "sound_healing", label: { en: "Sound healing", hi: "साउंड हीलिंग" } },
  {
    value: "hiking_nature",
    label: { en: "Hiking & nature walks", hi: "हाइकिंग और प्रकृति की सैर" },
  },
  {
    value: "bonfire_community",
    label: { en: "Bonfire & community circles", hi: "बॉनफायर और सामुदायिक सत्संग" },
  },
  { value: "journaling", label: { en: "Journaling & reflection", hi: "जर्नलिंग और आत्म-चिंतन" } },
  { value: "stillness", label: { en: "Silence & stillness", hi: "मौन और शांति" } },
];

// Step 4
export const EXPERIENCE_TYPE_OPTIONS: Option[] = [
  {
    value: "relaxation",
    label: { en: "Mostly relaxation & healing", hi: "मुख्यतः आराम और उपचार" },
  },
  {
    value: "adventure",
    label: { en: "Mostly adventure & exploration", hi: "मुख्यतः रोमांच और अन्वेषण" },
  },
  { value: "balance", label: { en: "A balance of both", hi: "दोनों का संतुलन" } },
  { value: "open", label: { en: "I'm open to everything", hi: "मैं हर चीज़ के लिए तैयार हूँ" } },
];

export const OUTDOOR_COMFORT_OPTIONS: Option[] = [
  { value: "yes", label: { en: "Yes", hi: "हाँ" } },
  {
    value: "yes_limitations",
    label: { en: "Yes, with some limitations", hi: "हाँ, कुछ सीमाओं के साथ" },
  },
  { value: "not_sure", label: { en: "I'm not sure", hi: "मुझे यकीन नहीं है" } },
  { value: "no", label: { en: "No", hi: "नहीं" } },
];

// Step 5
export const YES_NO_OPTIONS: Option[] = [
  { value: "yes", label: { en: "Yes", hi: "हाँ" } },
  { value: "no", label: { en: "No", hi: "नहीं" } },
];

export const TRAVEL_MODE_OPTIONS: Option[] = [
  { value: "flight", label: { en: "Flight", hi: "हवाई जहाज़" } },
  { value: "train", label: { en: "Train", hi: "ट्रेन" } },
  { value: "bus", label: { en: "Bus", hi: "बस" } },
  { value: "car_cab", label: { en: "Car / Cab", hi: "कार / कैब" } },
  { value: "other", label: { en: "Other", hi: "अन्य" } },
  { value: "not_decided", label: { en: "Not decided yet", hi: "अभी तय नहीं है" } },
];

export const TRAVEL_GUIDANCE_OPTIONS: Option[] = [
  { value: "yes_please", label: { en: "Yes please", hi: "जी हाँ" } },
  { value: "no_sorted", label: { en: "No, I'm sorted", hi: "नहीं, मैं व्यवस्थित हूँ" } },
  { value: "maybe", label: { en: "Maybe", hi: "शायद" } },
];

export const ACCOMMODATION_OPTIONS: Option[] = [
  { value: "single", label: { en: "Single occupancy", hi: "एकल आवास" } },
  { value: "twin", label: { en: "Twin sharing", hi: "ट्विन शेयरिंग" } },
  { value: "triple", label: { en: "Triple sharing", hi: "ट्रिपल शेयरिंग" } },
  {
    value: "none",
    label: { en: "I don't need accommodation", hi: "मुझे आवास की आवश्यकता नहीं है" },
  },
  {
    value: "tell_me_options",
    label: { en: "Please tell me the available options", hi: "कृपया उपलब्ध विकल्प बताएं" },
  },
];

// Step 6
export const FOOD_PREFERENCE_OPTIONS: Option[] = [
  { value: "vegetarian", label: { en: "Vegetarian", hi: "शाकाहारी" } },
  { value: "vegan", label: { en: "Vegan", hi: "वीगन" } },
  { value: "jain", label: { en: "Jain", hi: "जैन" } },
  { value: "other", label: { en: "Other", hi: "अन्य" } },
];

// Step 7
export const RELATIONSHIP_OPTIONS: Option[] = [
  { value: "parent", label: { en: "Parent", hi: "माता/पिता" } },
  { value: "spouse_partner", label: { en: "Spouse / Partner", hi: "जीवनसाथी / साथी" } },
  { value: "sibling", label: { en: "Sibling", hi: "भाई-बहन" } },
  { value: "friend", label: { en: "Friend", hi: "मित्र" } },
  { value: "other", label: { en: "Other", hi: "अन्य" } },
];

// Step 8
export const REGISTRATION_INTENT_OPTIONS: Option[] = [
  { value: "ready", label: { en: "I'm ready to register", hi: "मैं पंजीकरण के लिए तैयार हूँ" } },
  {
    value: "know_more",
    label: {
      en: "I'd like to know more before registering",
      hi: "पंजीकरण से पहले और जानकारी चाहिए",
    },
  },
  {
    value: "speak_team",
    label: { en: "I'd like to speak with the team", hi: "टीम से बात करनी है" },
  },
];
