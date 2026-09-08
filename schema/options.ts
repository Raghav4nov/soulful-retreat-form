export type Option = { value: string; label: string };

// Step 3
export const INTENTION_OPTIONS: Option[] = [
  { value: "rest_recovery", label: "Rest & recovery" },
  { value: "emotional_healing", label: "Emotional healing" },
  { value: "self_awareness", label: "Deepening self-awareness" },
  { value: "connecting_nature", label: "Connecting with nature" },
  { value: "community", label: "Meeting like-minded people" },
  { value: "spiritual_growth", label: "Spiritual growth" },
];

export const EXPERIENCE_OPTIONS: Option[] = [
  { value: "yoga_meditation", label: "Yoga & meditation" },
  { value: "sound_healing", label: "Sound healing" },
  { value: "hiking_nature", label: "Hiking & nature walks" },
  { value: "bonfire_community", label: "Bonfire & community circles" },
  { value: "journaling", label: "Journaling & reflection" },
  { value: "stillness", label: "Silence & stillness" },
];

// Step 4
export const EXPERIENCE_TYPE_OPTIONS: Option[] = [
  { value: "relaxation", label: "Mostly relaxation & healing" },
  { value: "adventure", label: "Mostly adventure & exploration" },
  { value: "balance", label: "A balance of both" },
  { value: "open", label: "I'm open to everything" },
];

export const OUTDOOR_COMFORT_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "yes_limitations", label: "Yes, with some limitations" },
  { value: "not_sure", label: "I'm not sure" },
  { value: "no", label: "No" },
];

// Step 5
export const YES_NO_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const TRAVEL_MODE_OPTIONS: Option[] = [
  { value: "flight", label: "Flight" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "car_cab", label: "Car / Cab" },
  { value: "other", label: "Other" },
  { value: "not_decided", label: "Not decided yet" },
];

export const TRAVEL_GUIDANCE_OPTIONS: Option[] = [
  { value: "yes_please", label: "Yes please" },
  { value: "no_sorted", label: "No, I'm sorted" },
  { value: "maybe", label: "Maybe" },
];

export const ACCOMMODATION_OPTIONS: Option[] = [
  { value: "single", label: "Single occupancy" },
  { value: "twin", label: "Twin sharing" },
  { value: "triple", label: "Triple sharing" },
  { value: "none", label: "I don't need accommodation" },
  { value: "tell_me_options", label: "Please tell me the available options" },
];

// Step 6
export const FOOD_PREFERENCE_OPTIONS: Option[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "jain", label: "Jain" },
  { value: "other", label: "Other" },
];

// Step 7
export const RELATIONSHIP_OPTIONS: Option[] = [
  { value: "parent", label: "Parent" },
  { value: "spouse_partner", label: "Spouse / Partner" },
  { value: "sibling", label: "Sibling" },
  { value: "friend", label: "Friend" },
  { value: "other", label: "Other" },
];

// Step 8
export const REGISTRATION_INTENT_OPTIONS: Option[] = [
  { value: "ready", label: "I'm ready to register" },
  { value: "know_more", label: "I'd like to know more before registering" },
  { value: "speak_team", label: "I'd like to speak with the team" },
];
