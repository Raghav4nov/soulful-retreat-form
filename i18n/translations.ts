import type { ValidationMessages } from "@/schema/formSchema";
import type { Locale } from "./types";

type StepInfo = { title: string; description: string };

export interface TranslationDict {
  common: {
    appTitle: string;
    back: string;
    continue: string;
    optional: string;
    formatStep: (current: number, total: number) => string;
  };
  brand: {
    name: string;
    dateLocation: string;
    badge: string;
  };
  step1: {
    tagline: string;
    description: string;
    cta: string;
  };
  step2: {
    heading: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    whatsappLabel: string;
    whatsappPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
  };
  step3: {
    heading: string;
    intentionsLabel: string;
    experiencesLabel: string;
  };
  step4: {
    heading: string;
    experienceTypeQuestion: string;
    outdoorComfortQuestion: string;
    specialRequestsLabel: string;
    specialRequestsPlaceholder: string;
  };
  step5: {
    heading: string;
    travellingFromOutsideQuestion: string;
    travelModeQuestion: string;
    travelGuidanceQuestion: string;
    accommodationLabel: string;
    companionLabel: string;
    companionPlaceholder: string;
  };
  step6: {
    heading: string;
    foodPreferenceLabel: string;
    hasAllergiesQuestion: string;
    allergyDetailsLabel: string;
    allergyDetailsPlaceholder: string;
    foodNotesLabel: string;
    foodNotesPlaceholder: string;
  };
  step7: {
    heading: string;
    intro: string;
    contactNameLabel: string;
    contactNamePlaceholder: string;
    contactNumberLabel: string;
    contactNumberPlaceholder: string;
    relationshipLabel: string;
    activityNotesLabel: string;
    activityNotesPlaceholder: string;
  };
  step8: {
    heading: string;
    investmentLabel: string;
    investmentValue: string;
    includesLabel: string;
    includes: string[];
    notIncludedLabel: string;
    notIncluded: string[];
    proceedQuestion: string;
    continueToPayment: string;
    submitRegistration: string;
  };
  step9: {
    heading: string;
    intro: string;
    amountLabel: string;
    upiLabel: string;
    qrPlaceholder: string;
    utrLabel: string;
    utrPlaceholder: string;
    agreementLabel: string;
    registerButton: string;
  };
  step10: {
    heading: string;
    thankYou: (name: string) => string;
    receivedPrefix: string;
    quote: string;
    steps: StepInfo[];
    finalText: string;
  };
  validation: ValidationMessages;
}

const en: TranslationDict = {
  common: {
    appTitle: "Retreat Program Registration",
    back: "Back",
    continue: "Continue",
    optional: "(optional)",
    formatStep: (current, total) => `Step ${current} of ${total}`,
  },
  brand: {
    name: "Soulful Healing Adventure",
    dateLocation: "Rishikesh · 14–15 November 2026",
    badge: "RISHIKESH · 14–15 NOVEMBER 2026",
  },
  step1: {
    tagline: "Same you. But a kinder, calmer, brighter version.",
    description:
      "A short registration to help our team understand you, and make sure your time with us feels exactly right. It takes about five minutes.",
    cta: "Begin Registration",
  },
  step2: {
    heading: "Let's Get To Know You",
    fullNameLabel: "Full name",
    fullNamePlaceholder: "Your full name",
    whatsappLabel: "WhatsApp number",
    whatsappPlaceholder: "e.g. +91 98765 43210",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
  },
  step3: {
    heading: "What Are You Hoping To Find Here?",
    intentionsLabel: "What draws you to this retreat? (Select all that apply)",
    experiencesLabel: "Which experiences excite you most? (Select all that apply)",
  },
  step4: {
    heading: "How Would You Like To Experience The Retreat?",
    experienceTypeQuestion: "What kind of experience are you looking for?",
    outdoorComfortQuestion: "Are you comfortable participating in outdoor/nature-based activities?",
    specialRequestsLabel:
      "Is there anything you'd particularly like our team to arrange or keep in mind to make your retreat experience more comfortable?",
    specialRequestsPlaceholder: "Share anything that would help us take care of you",
  },
  step5: {
    heading: "Your Journey To Rishikesh",
    travellingFromOutsideQuestion: "Are you travelling from outside Rishikesh?",
    travelModeQuestion: "How will you be reaching Rishikesh?",
    travelGuidanceQuestion: "Would you like guidance regarding reaching the retreat location?",
    accommodationLabel: "Accommodation preference",
    companionLabel: "If you're coming with someone, please mention their name",
    companionPlaceholder: "Companion's name",
  },
  step6: {
    heading: "Nourish Your Body",
    foodPreferenceLabel: "Food preference",
    hasAllergiesQuestion: "Do you have any food allergies or dietary restrictions?",
    allergyDetailsLabel: "Please tell us about them",
    allergyDetailsPlaceholder: "List any allergies or dietary restrictions",
    foodNotesLabel: "Is there anything else about your food preferences we should know?",
    foodNotesPlaceholder: "Anything else we should keep in mind",
  },
  step7: {
    heading: "Just For Your Safety",
    intro: "We ask for these details only so our team can support you appropriately during the retreat.",
    contactNameLabel: "Emergency contact name",
    contactNamePlaceholder: "Full name",
    contactNumberLabel: "Emergency contact number",
    contactNumberPlaceholder: "e.g. +91 98765 43210",
    relationshipLabel: "Relationship with emergency contact",
    activityNotesLabel:
      "Is there anything our retreat team should be aware of regarding your participation in physical, outdoor or nature-based activities?",
    activityNotesPlaceholder: "Share anything relevant to your safety and comfort",
  },
  step8: {
    heading: "Your Place In The Journey",
    investmentLabel: "Retreat Investment",
    investmentValue: "₹[Placeholder]",
    includesLabel: "Includes",
    includes: [
      "Accommodation",
      "Meals",
      "Guided experiences",
      "Sound Healing",
      "Nature experiences",
      "Bonfire",
      "Community activities",
    ],
    notIncludedLabel: "Not Included",
    notIncluded: ["Travel to/from Rishikesh", "Personal expenses"],
    proceedQuestion: "How would you like to proceed?",
    continueToPayment: "Continue to Payment",
    submitRegistration: "Submit Registration",
  },
  step9: {
    heading: "Complete Your Registration",
    intro: "Your journey is almost ready to begin.",
    amountLabel: "Registration Amount",
    upiLabel: "UPI ID",
    qrPlaceholder: "QR Code",
    utrLabel: "Transaction / UTR Number",
    utrPlaceholder: "Enter the transaction reference",
    agreementLabel: "I confirm my details are accurate and agree to the retreat policies.",
    registerButton: "Register For The Journey →",
  },
  step10: {
    heading: "Welcome To The Journey",
    thankYou: (name) => `Thank you, ${name}.`,
    receivedPrefix: "We've received your registration for:",
    quote: "Same you. But a kinder, calmer, brighter version.",
    steps: [
      { title: "Registration received.", description: "Our team will review your details." },
      { title: "Confirmation.", description: "We'll contact you on WhatsApp." },
      {
        title: "Retreat details.",
        description: "You'll receive the location, itinerary, and packing list.",
      },
      { title: "Rishikesh awaits.", description: "" },
    ],
    finalText: "Good People. Good Energy. Good Experiences. See you in Rishikesh.",
  },
  validation: {
    intentionsRequired: "Please select at least one intention",
    experiencesRequired: "Please select at least one experience",
    fullNameRequired: "Please enter your full name",
    whatsappInvalid: "Please enter a valid WhatsApp number",
    emailInvalid: "Please enter a valid email address",
    selectOption: "Please select an option",
    travelModeRequired: "Please let us know how you'll be reaching Rishikesh",
    allergyDetailsRequired: "Please tell us about your allergies or dietary restrictions",
    emergencyNameRequired: "Please enter a name",
    phoneInvalid: "Please enter a valid phone number",
    utrRequired: "Please enter your transaction / UTR number",
    policyRequired: "Please confirm to proceed",
  },
};

const hi: TranslationDict = {
  common: {
    appTitle: "रिट्रीट कार्यक्रम पंजीकरण",
    back: "पीछे",
    continue: "जारी रखें",
    optional: "(वैकल्पिक)",
    formatStep: (current, total) => `चरण ${current} / ${total}`,
  },
  brand: {
    name: "सोलफुल हीलिंग एडवेंचर",
    dateLocation: "ऋषिकेश · 14–15 नवंबर 2026",
    badge: "ऋषिकेश · 14–15 नवंबर 2026",
  },
  step1: {
    tagline: "वही आप। बस एक अधिक दयालु, शांत और उज्जवल संस्करण।",
    description:
      "एक छोटा पंजीकरण फ़ॉर्म, ताकि हमारी टीम आपको बेहतर समझ सके और आपका समय हमारे साथ बिल्कुल सही महसूस हो। इसमें लगभग पाँच मिनट लगते हैं।",
    cta: "पंजीकरण शुरू करें",
  },
  step2: {
    heading: "आइए आपको जानते हैं",
    fullNameLabel: "पूरा नाम",
    fullNamePlaceholder: "अपना पूरा नाम लिखें",
    whatsappLabel: "व्हाट्सएप नंबर",
    whatsappPlaceholder: "उदाहरण: +91 98765 43210",
    emailLabel: "ईमेल पता",
    emailPlaceholder: "you@example.com",
  },
  step3: {
    heading: "आप यहाँ क्या पाना चाहते हैं?",
    intentionsLabel: "इस रिट्रीट की ओर आपको क्या आकर्षित करता है? (जो लागू हों उन्हें चुनें)",
    experiencesLabel: "कौन से अनुभव आपको सबसे ज़्यादा उत्साहित करते हैं? (जो लागू हों उन्हें चुनें)",
  },
  step4: {
    heading: "आप इस रिट्रीट का अनुभव कैसे करना चाहेंगे?",
    experienceTypeQuestion: "आप किस तरह का अनुभव चाहते हैं?",
    outdoorComfortQuestion: "क्या आप बाहरी/प्रकृति-आधारित गतिविधियों में भाग लेने में सहज हैं?",
    specialRequestsLabel:
      "क्या ऐसा कुछ है जो आप चाहेंगे कि हमारी टीम आपके अनुभव को अधिक आरामदायक बनाने के लिए विशेष रूप से व्यवस्थित करे या ध्यान में रखे?",
    specialRequestsPlaceholder: "कुछ भी साझा करें जिससे हम आपका बेहतर ख्याल रख सकें",
  },
  step5: {
    heading: "ऋषिकेश की आपकी यात्रा",
    travellingFromOutsideQuestion: "क्या आप ऋषिकेश के बाहर से यात्रा कर रहे हैं?",
    travelModeQuestion: "आप ऋषिकेश कैसे पहुँचेंगे?",
    travelGuidanceQuestion: "क्या आपको रिट्रीट स्थान तक पहुँचने के बारे में मार्गदर्शन चाहिए?",
    accommodationLabel: "आवास प्राथमिकता",
    companionLabel: "यदि आप किसी के साथ आ रहे हैं, तो कृपया उनका नाम बताएं",
    companionPlaceholder: "साथी का नाम",
  },
  step6: {
    heading: "अपने शरीर को पोषण दें",
    foodPreferenceLabel: "भोजन प्राथमिकता",
    hasAllergiesQuestion: "क्या आपको कोई खाद्य एलर्जी या आहार संबंधी प्रतिबंध हैं?",
    allergyDetailsLabel: "कृपया हमें उनके बारे में बताएं",
    allergyDetailsPlaceholder: "किसी भी एलर्जी या आहार प्रतिबंध की सूची बनाएं",
    foodNotesLabel: "क्या आपकी भोजन प्राथमिकताओं के बारे में कुछ और है जो हमें जानना चाहिए?",
    foodNotesPlaceholder: "कुछ और जो हमें ध्यान में रखना चाहिए",
  },
  step7: {
    heading: "केवल आपकी सुरक्षा के लिए",
    intro: "हम ये विवरण केवल इसलिए माँग रहे हैं ताकि हमारी टीम रिट्रीट के दौरान आपकी उचित सहायता कर सके।",
    contactNameLabel: "आपातकालीन संपर्क का नाम",
    contactNamePlaceholder: "पूरा नाम",
    contactNumberLabel: "आपातकालीन संपर्क नंबर",
    contactNumberPlaceholder: "उदाहरण: +91 98765 43210",
    relationshipLabel: "आपातकालीन संपर्क के साथ संबंध",
    activityNotesLabel:
      "क्या शारीरिक, बाहरी या प्रकृति-आधारित गतिविधियों में आपकी भागीदारी को लेकर हमारी टीम को कुछ पता होना चाहिए?",
    activityNotesPlaceholder: "अपनी सुरक्षा और सुविधा से जुड़ी कोई भी जानकारी साझा करें",
  },
  step8: {
    heading: "इस यात्रा में आपका स्थान",
    investmentLabel: "रिट्रीट निवेश",
    investmentValue: "₹[Placeholder]",
    includesLabel: "शामिल है",
    includes: [
      "आवास",
      "भोजन",
      "निर्देशित अनुभव",
      "साउंड हीलिंग",
      "प्रकृति अनुभव",
      "बॉनफायर",
      "सामुदायिक गतिविधियाँ",
    ],
    notIncludedLabel: "शामिल नहीं है",
    notIncluded: ["ऋषिकेश आने-जाने की यात्रा", "व्यक्तिगत खर्च"],
    proceedQuestion: "आप आगे कैसे बढ़ना चाहेंगे?",
    continueToPayment: "भुगतान की ओर बढ़ें",
    submitRegistration: "पंजीकरण सबमिट करें",
  },
  step9: {
    heading: "अपना पंजीकरण पूरा करें",
    intro: "आपकी यात्रा शुरू होने ही वाली है।",
    amountLabel: "पंजीकरण राशि",
    upiLabel: "यूपीआई आईडी",
    qrPlaceholder: "क्यूआर कोड",
    utrLabel: "लेनदेन / यूटीआर नंबर",
    utrPlaceholder: "लेनदेन संदर्भ दर्ज करें",
    agreementLabel: "यह जानकारी सही है और मैं रिट्रीट की नीतियों से सहमत हूँ।",
    registerButton: "यात्रा के लिए पंजीकरण करें →",
  },
  step10: {
    heading: "यात्रा में आपका स्वागत है",
    thankYou: (name) => `धन्यवाद, ${name}।`,
    receivedPrefix: "हमें आपका पंजीकरण मिल गया है:",
    quote: "वही आप। बस एक अधिक दयालु, शांत और उज्जवल संस्करण।",
    steps: [
      { title: "पंजीकरण प्राप्त हुआ।", description: "हमारी टीम आपकी जानकारी की समीक्षा करेगी।" },
      { title: "पुष्टिकरण।", description: "हम आपसे व्हाट्सएप पर संपर्क करेंगे।" },
      {
        title: "रिट्रीट विवरण।",
        description: "आपको स्थान, कार्यक्रम और पैकिंग सूची प्राप्त होगी।",
      },
      { title: "ऋषिकेश आपका इंतज़ार कर रहा है।", description: "" },
    ],
    finalText: "अच्छे लोग। अच्छी ऊर्जा। अच्छे अनुभव। ऋषिकेश में मिलते हैं।",
  },
  validation: {
    intentionsRequired: "कृपया कम से कम एक इरादा चुनें",
    experiencesRequired: "कृपया कम से कम एक अनुभव चुनें",
    fullNameRequired: "कृपया अपना पूरा नाम दर्ज करें",
    whatsappInvalid: "कृपया एक मान्य व्हाट्सएप नंबर दर्ज करें",
    emailInvalid: "कृपया एक मान्य ईमेल पता दर्ज करें",
    selectOption: "कृपया एक विकल्प चुनें",
    travelModeRequired: "कृपया हमें बताएं कि आप ऋषिकेश कैसे पहुँचेंगे",
    allergyDetailsRequired: "कृपया हमें अपनी एलर्जी या आहार प्रतिबंधों के बारे में बताएं",
    emergencyNameRequired: "कृपया एक नाम दर्ज करें",
    phoneInvalid: "कृपया एक मान्य फ़ोन नंबर दर्ज करें",
    utrRequired: "कृपया अपना लेनदेन / यूटीआर नंबर दर्ज करें",
    policyRequired: "आगे बढ़ने के लिए कृपया पुष्टि करें",
  },
};

export const translations: Record<Locale, TranslationDict> = { en, hi };
