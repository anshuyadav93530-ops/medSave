import { createContext, useContext, useEffect, useState } from 'react';

// Translation text is grouped by screen so UI copy stays in one shared catalog.
const en = {
  common: {
    'Dashboard':'Dashboard','Medicine inventory':'Medicine inventory','Expiry tracker':'Expiry tracker','Reports':'Reports','Settings':'Settings','WORKSPACE':'WORKSPACE','CARE, ORGANIZED':'CARE, ORGANIZED','Here’s what’s happening with your inventory today.':'Here’s what’s happening with your inventory today.','Manage and keep track of all your medicines.':'Manage and keep track of all your medicines.','Stay ahead of medicines nearing their expiry date.':'Stay ahead of medicines nearing their expiry date.','Understand your inventory at a glance.':'Understand your inventory at a glance.','Manage your workspace preferences.':'Manage your workspace preferences.','Manage your medicine stock, batch details, and expiry dates.':'Manage your medicine stock, batch details, and expiry dates.',
    'Stay ahead of expiry':'Stay ahead of expiry','Keep your inventory safe and up to date.':'Keep your inventory safe and up to date.','View expiry tracker':'View expiry tracker','Workspace':'Workspace','Your inventory':'Your inventory',
    'Alex Rivera':'Alex Rivera','Workspace owner':'Workspace owner','Add medicine':'Add medicine','Quick add medicine':'Quick add medicine','Open menu':'Open menu','Close menu':'Close menu','Expand sidebar':'Expand sidebar','Collapse sidebar':'Collapse sidebar',
    'Open expiry alerts':'Open expiry alerts','Close dialog':'Close dialog','Help & preferences':'Help & preferences','All changes saved locally':'All changes saved locally','Healthy':'Healthy','Expiring soon':'Expiring soon','Expired':'Expired','No inventory to chart yet.':'No inventory to chart yet.','Delete {name} (batch {batch}) from your inventory? This cannot be undone.':'Delete {name} (batch {batch}) from your inventory? This cannot be undone.','USD — US Dollar':'USD — US Dollar','EUR — Euro':'EUR — Euro','GBP — Pound':'GBP — Pound','INR — Indian Rupee':'INR — Indian Rupee','NPR — Nepalese Rupee':'NPR — Nepalese Rupee',
    'All statuses':'All statuses','Within 7 days':'Within 7 days','Within 30 days':'Within 30 days','Later':'Later','units':'units','medicines':'medicines','TODAY':'TODAY','Cancel':'Cancel','Save changes':'Save changes','Delete':'Delete','Edit':'Edit','Sort by':'Sort by',
    'Select category':'Select category','Analgesic':'Analgesic','Antibiotic':'Antibiotic','Antihistamine':'Antihistamine','Cardiovascular':'Cardiovascular','Diabetes care':'Diabetes care','First aid':'First aid','Supplement':'Supplement',
  },
  dashboard: {
    'YOUR INVENTORY AT A GLANCE':'YOUR INVENTORY AT A GLANCE','Good morning, Alex':'Good morning, Alex','Your medicine inventory is looking good. Here’s your daily overview.':'Your medicine inventory is looking good. Here’s your daily overview.',
    'Review expiry schedule':'Review expiry schedule','Total medicines':'Total medicines','Across all categories':'Across all categories','IN STOCK':'IN STOCK','Expiring in 30 days':'Expiring in 30 days','Needs your attention':'Needs your attention',
    'Review':'Review','All clear':'All clear','Expired medicines':'Expired medicines','{count} units to review':'{count} units to review','Action needed':'Action needed','Healthy inventory':'Healthy inventory','More than 30 days to expiry':'More than 30 days to expiry','On track':'On track',
    'Expiry overview':'Expiry overview','Medicines by expiry timeline':'Medicines by expiry timeline','need attention':'need attention','View tracker':'View tracker','See all medicines by expiry date':'See all medicines by expiry date',
    'Inventory distribution':'Inventory distribution','Stock units by category':'Stock units by category','Open reports':'Open reports','View inventory report':'View inventory report','Recent medicines':'Recent medicines',
    'Latest additions to your inventory':'Latest additions to your inventory','View inventory':'View inventory','Expires {date}':'Expires {date}','Expiry alerts':'Expiry alerts','Medicines that need a closer look':'Medicines that need a closer look',
    'Expired {days} days ago':'Expired {days} days ago','Expires in {days} days':'Expires in {days} days',"You're all clear for the next 30 days.":"You're all clear for the next 30 days.",'Review all alerts':'Review all alerts','Add a medicine to get started.':'Add a medicine to get started.',
  },
  inventory: {
    'YOUR STOCK, AT A GLANCE':'YOUR STOCK, AT A GLANCE','Manage and keep track of all your medicines.':'Manage and keep track of all your medicines.','In your inventory':'In your inventory','Expiring soon':'Expiring soon',
    'Medicine name':'Medicine name','Category':'Category','Batch number':'Batch number','Quantity':'Quantity','Expiry date':'Expiry date','Expiry status':'Expiry status','Actions':'Actions','Search medicine or batch...':'Search medicine or batch...',
    'Search medicines':'Search medicines','Filter by expiry status':'Filter by expiry status','{count} medicines':'{count} medicines','No storage instructions':'No storage instructions','No medicines found':'No medicines found','Try a different search or filter.':'Try a different search or filter.',
    'Showing {start}–{end} of {total} medicines':'Showing {start}–{end} of {total} medicines','Page {page} of {total}':'Page {page} of {total}','Previous page':'Previous page','Next page':'Next page','Clear filter':'Clear filter','Showing: {filter}':'Showing: {filter}','All medicines':'All medicines',
  },
  form: {
    'Add a medicine':'Add a medicine','Edit medicine':'Edit medicine','Update the details for this medicine.':'Update the details for this medicine.','Enter the medicine details to add it to your inventory.':'Enter the medicine details to add it to your inventory.',
    'Medicine details':'Medicine details','Dates and storage':'Dates and storage','Purchase date':'Purchase date','Storage instructions':'Storage instructions','Notes':'Notes','Unit purchase price':'Unit purchase price','Required fields':'Required fields',
    'Enter a medicine name.':'Enter a medicine name.','Choose a category.':'Choose a category.','Enter a batch number.':'Enter a batch number.','Enter a whole number of 0 or more.':'Enter a whole number of 0 or more.',
    'Choose the purchase date.':'Choose the purchase date.','Choose the expiry date.':'Choose the expiry date.','Expiry date must be on or after purchase date.':'Expiry date must be on or after purchase date.','Enter a price of 0 or more.':'Enter a price of 0 or more.',
    'Please correct the highlighted fields and try again.':'Please correct the highlighted fields and try again.','e.g. Store below 25°C':'e.g. Store below 25°C','Add any additional details':'Add any additional details','e.g. PCM-24-081':'e.g. PCM-24-081',
  },
  expiry: {
    'EXPIRY CALENDAR':'EXPIRY CALENDAR','A clear view of what’s expiring and when.':'A clear view of what’s expiring and when.','{count} medicines need attention':'{count} medicines need attention',
    "Based on today's date · statuses update automatically":"Based on today's date · statuses update automatically",'These medicines have passed their expiry date.':'These medicines have passed their expiry date.','Review these medicines as soon as possible.':'Review these medicines as soon as possible.',
    'Plan usage or restocking for the coming weeks.':'Plan usage or restocking for the coming weeks.','No immediate expiry action required.':'No immediate expiry action required.','{days}d ago':'{days}d ago','{days}d left':'{days}d left','No medicines in this time range.':'No medicines in this time range.',
  },
  reports: {
    'INVENTORY INSIGHTS':'INVENTORY INSIGHTS','A snapshot of your current stock and expiry exposure.':'A snapshot of your current stock and expiry exposure.','Total stock units':'Total stock units','Across {count} medicines':'Across {count} medicines',
    'Expired stock quantity':'Expired stock quantity','Across {count} expired medicines':'Across {count} expired medicines','Estimated wastage value':'Estimated wastage value','Based on sample unit purchase prices':'Based on sample unit purchase prices',
    'Current stock units by category':'Current stock units by category','{count} units':'{count} units','Expiry distribution':'Expiry distribution','Medicine count by time to expiry':'Medicine count by time to expiry','{count} total':'{count} total',
    'More than 30 days':'More than 30 days','Wastage uses sample purchase prices only; actual amounts may differ.':'Wastage uses sample purchase prices only; actual amounts may differ.','These reports are calculated from the medicines currently saved in this browser.':'These reports are calculated from the medicines currently saved in this browser.','No stock data to report.':'No stock data to report.',
  },
  settings: {
    'WORKSPACE PREFERENCES':'WORKSPACE PREFERENCES','Personalize how MedSave works for you.':'Personalize how MedSave works for you.','General':'General','Notifications':'Notifications','Appearance':'Appearance','Choose how the dashboard looks on this device.':'Choose how the dashboard looks on this device.',
    'Compact tables':'Compact tables','Use tighter spacing in inventory lists.':'Use tighter spacing in inventory lists.','Color theme':'Color theme','MedSave uses a clean, light appearance.':'MedSave uses a clean, light appearance.','Light mode':'Light mode','Dark mode':'Dark mode',
    'Language':'Language','Choose the language used across MedSave.':'Choose the language used across MedSave.','English':'English','Hindi':'Hindi','Choose which in-app reminders you prefer.':'Choose which in-app reminders you prefer.','Expiry reminders':'Expiry reminders',
    'Show reminders for medicines expiring soon.':'Show reminders for medicines expiring soon.','Email notification preference':'Email notification preference','Save your preference for future email alerts.':'Save your preference for future email alerts.',
    'Notifications are visual preferences only in this frontend demo; no messages are sent.':'Notifications are visual preferences only in this frontend demo; no messages are sent.','Set defaults for your medicine stock overview.':'Set defaults for your medicine stock overview.',
    'Low stock threshold':'Low stock threshold','Quantities at or below this number can be considered low.':'Quantities at or below this number can be considered low.','Display currency':'Display currency','Format the sample estimate only; amounts are not converted.':'Format the sample estimate only; amounts are not converted.','Preferences save automatically on this device.':'Preferences save automatically on this device.',
  },
  toast: {'{name} updated successfully':'{name} updated successfully','{name} added to inventory':'{name} added to inventory','{name} deleted':'{name} deleted','Medicine deleted':'Medicine deleted'},
};

const hi = {
  common: {
    'Dashboard':'डैशबोर्ड','Medicine inventory':'दवा भंडार','Expiry tracker':'समाप्ति ट्रैकर','Reports':'रिपोर्ट','Settings':'सेटिंग्स','WORKSPACE':'कार्य क्षेत्र','CARE, ORGANIZED':'व्यवस्थित देखभाल','Here’s what’s happening with your inventory today.':'आज आपके दवा भंडार की स्थिति।','Manage and keep track of all your medicines.':'अपनी सभी दवाओं का प्रबंधन और निगरानी करें।','Stay ahead of medicines nearing their expiry date.':'समाप्ति के करीब दवाओं पर पहले से ध्यान दें।','Understand your inventory at a glance.':'अपने भंडार को एक नज़र में समझें।','Manage your workspace preferences.':'अपने कार्य क्षेत्र की प्राथमिकताएँ बदलें।','Manage your medicine stock, batch details, and expiry dates.':'अपने दवा भंडार, बैच विवरण और समाप्ति तारीख़ों का प्रबंधन करें।',
    'Stay ahead of expiry':'समाप्ति से पहले तैयार रहें','Keep your inventory safe and up to date.':'अपने भंडार को सुरक्षित और अद्यतन रखें।','View expiry tracker':'समाप्ति ट्रैकर देखें','Workspace':'कार्य क्षेत्र','Your inventory':'आपका भंडार',
    'Alex Rivera':'एलेक्स रिवेरा','Workspace owner':'कार्य क्षेत्र के मालिक','Add medicine':'दवा जोड़ें','Quick add medicine':'जल्दी से दवा जोड़ें','Open menu':'मेनू खोलें','Close menu':'मेनू बंद करें','Expand sidebar':'साइडबार फैलाएँ','Collapse sidebar':'साइडबार समेटें',
    'Open expiry alerts':'समाप्ति चेतावनी खोलें','Close dialog':'डायलॉग बंद करें','Help & preferences':'सहायता और प्राथमिकताएँ','All changes saved locally':'सभी बदलाव इस डिवाइस पर सहेजे गए','Healthy':'ठीक','Expiring soon':'जल्द समाप्त होगी','Expired':'समाप्त','No inventory to chart yet.':'चार्ट के लिए अभी भंडार नहीं है।','Delete {name} (batch {batch}) from your inventory? This cannot be undone.':'क्या आप {name} (बैच {batch}) को भंडार से हटाना चाहते हैं? इसे वापस नहीं किया जा सकता।','USD — US Dollar':'USD — अमेरिकी डॉलर','EUR — Euro':'EUR — यूरो','GBP — Pound':'GBP — पाउंड','INR — Indian Rupee':'INR — भारतीय रुपया','NPR — Nepalese Rupee':'NPR — नेपाली रुपया',
    'All statuses':'सभी स्थितियाँ','Within 7 days':'7 दिनों के भीतर','Within 30 days':'30 दिनों के भीतर','Later':'बाद में','units':'इकाइयाँ','medicines':'दवाएँ','TODAY':'आज','Cancel':'रद्द करें','Save changes':'बदलाव सहेजें','Delete':'हटाएँ','Edit':'संपादित करें','Sort by':'इसके अनुसार क्रमबद्ध करें',
    'Select category':'श्रेणी चुनें','Analgesic':'दर्द निवारक','Antibiotic':'एंटीबायोटिक','Antihistamine':'एलर्जी की दवा','Cardiovascular':'हृदय संबंधी','Diabetes care':'मधुमेह देखभाल','First aid':'प्राथमिक उपचार','Supplement':'पूरक',
  },
  dashboard: {
    'YOUR INVENTORY AT A GLANCE':'आपके दवा भंडार की एक झलक','Good morning, Alex':'सुप्रभात, एलेक्स','Your medicine inventory is looking good. Here’s your daily overview.':'आपका दवा भंडार अच्छा दिख रहा है। आज का सारांश देखें।',
    'Review expiry schedule':'समाप्ति समय-सारणी देखें','Total medicines':'कुल दवाएँ','Across all categories':'सभी श्रेणियों में','IN STOCK':'भंडार में','Expiring in 30 days':'30 दिनों में समाप्त होने वाली','Needs your attention':'ध्यान देने की ज़रूरत',
    'Review':'जाँचें','All clear':'सब ठीक है','Expired medicines':'समाप्त दवाएँ','{count} units to review':'जाँच के लिए {count} इकाइयाँ','Action needed':'कार्रवाई ज़रूरी','Healthy inventory':'सुरक्षित दवा भंडार','More than 30 days to expiry':'समाप्ति में 30 दिनों से अधिक','On track':'ठीक चल रहा है',
    'Expiry overview':'समाप्ति का सारांश','Medicines by expiry timeline':'समाप्ति समय के अनुसार दवाएँ','need attention':'पर ध्यान दें','View tracker':'ट्रैकर देखें','See all medicines by expiry date':'समाप्ति तारीख के अनुसार सभी दवाएँ देखें',
    'Inventory distribution':'भंडार का वितरण','Stock units by category':'श्रेणी के अनुसार भंडार इकाइयाँ','Open reports':'रिपोर्ट खोलें','View inventory report':'भंडार रिपोर्ट देखें','Recent medicines':'हाल की दवाएँ','Latest additions to your inventory':'भंडार में हाल ही में जोड़ी गई दवाएँ','View inventory':'भंडार देखें',
    'Expires {date}':'{date} को समाप्त होगी','Expiry alerts':'समाप्ति चेतावनियाँ','Medicines that need a closer look':'जिन दवाओं पर ध्यान देना है','Expired {days} days ago':'{days} दिन पहले समाप्त हुई','Expires in {days} days':'{days} दिन में समाप्त होगी',
    "You're all clear for the next 30 days.":'अगले 30 दिनों में कोई चेतावनी नहीं है।','Review all alerts':'सभी चेतावनियाँ देखें','Add a medicine to get started.':'शुरू करने के लिए दवा जोड़ें।',
  },
  inventory: {
    'YOUR STOCK, AT A GLANCE':'आपका भंडार एक नज़र में','Manage and keep track of all your medicines.':'अपनी सभी दवाओं का प्रबंधन और निगरानी करें।','In your inventory':'आपके भंडार में','Expiring soon':'जल्द समाप्त होगी',
    'Medicine name':'दवा का नाम','Category':'श्रेणी','Batch number':'बैच नंबर','Quantity':'मात्रा','Expiry date':'समाप्ति तारीख','Expiry status':'समाप्ति स्थिति','Actions':'कार्रवाई','Search medicine or batch...':'दवा या बैच खोजें...',
    'Search medicines':'दवाएँ खोजें','Filter by expiry status':'समाप्ति स्थिति से फ़िल्टर करें','{count} medicines':'{count} दवाएँ','No storage instructions':'भंडारण निर्देश नहीं हैं','No medicines found':'कोई दवा नहीं मिली','Try a different search or filter.':'दूसरी खोज या फ़िल्टर आज़माएँ।',
    'Showing {start}–{end} of {total} medicines':'{total} में से {start}–{end} दवाएँ दिखाई जा रही हैं','Page {page} of {total}':'{total} में से पृष्ठ {page}','Previous page':'पिछला पृष्ठ','Next page':'अगला पृष्ठ','Clear filter':'फ़िल्टर हटाएँ','Showing: {filter}':'फ़िल्टर: {filter}','All medicines':'सभी दवाएँ',
  },
  form: {
    'Add a medicine':'दवा जोड़ें','Edit medicine':'दवा संपादित करें','Update the details for this medicine.':'इस दवा का विवरण बदलें।','Enter the medicine details to add it to your inventory.':'भंडार में जोड़ने के लिए दवा का विवरण भरें।',
    'Medicine details':'दवा का विवरण','Dates and storage':'तारीख़ और भंडारण','Purchase date':'खरीद की तारीख़','Storage instructions':'भंडारण निर्देश','Notes':'टिप्पणियाँ','Unit purchase price':'प्रति इकाई खरीद मूल्य','Required fields':'ज़रूरी फ़ील्ड',
    'Enter a medicine name.':'दवा का नाम भरें।','Choose a category.':'श्रेणी चुनें।','Enter a batch number.':'बैच नंबर भरें।','Enter a whole number of 0 or more.':'0 या उससे बड़ी पूर्ण संख्या भरें।','Choose the purchase date.':'खरीद की तारीख़ चुनें।','Choose the expiry date.':'समाप्ति तारीख़ चुनें।',
    'Expiry date must be on or after purchase date.':'समाप्ति तारीख़ खरीद की तारीख़ के बाद होनी चाहिए।','Enter a price of 0 or more.':'0 या उससे अधिक मूल्य भरें।','Please correct the highlighted fields and try again.':'चिह्नित फ़ील्ड ठीक करके फिर कोशिश करें।','e.g. Store below 25°C':'जैसे: 25°C से कम तापमान पर रखें','Add any additional details':'अन्य जानकारी जोड़ें','e.g. PCM-24-081':'जैसे: PCM-24-081',
  },
  expiry: {
    'EXPIRY CALENDAR':'समाप्ति कैलेंडर','A clear view of what’s expiring and when.':'कौन सी दवा कब समाप्त होगी, साफ़ देखें।','{count} medicines need attention':'{count} दवाओं पर ध्यान देना है',"Based on today's date · statuses update automatically":'आज की तारीख़ के अनुसार · स्थिति अपने आप बदलती है',
    'These medicines have passed their expiry date.':'इन दवाओं की समाप्ति तारीख़ निकल चुकी है।','Review these medicines as soon as possible.':'इन दवाओं की जल्द जाँच करें।','Plan usage or restocking for the coming weeks.':'आने वाले हफ़्तों के उपयोग या भंडार की योजना बनाएँ।','No immediate expiry action required.':'अभी समाप्ति संबंधी कार्रवाई ज़रूरी नहीं है।','{days}d ago':'{days} दिन पहले','{days}d left':'{days} दिन बाकी','No medicines in this time range.':'इस समय अवधि में कोई दवा नहीं है।',
  },
  reports: {
    'INVENTORY INSIGHTS':'भंडार की जानकारी','A snapshot of your current stock and expiry exposure.':'आपके मौजूदा भंडार और समाप्ति का सारांश।','Total stock units':'भंडार की कुल इकाइयाँ','Across {count} medicines':'{count} दवाओं में','Expired stock quantity':'समाप्त भंडार की मात्रा','Across {count} expired medicines':'{count} समाप्त दवाओं में',
    'Estimated wastage value':'अनुमानित बर्बादी मूल्य','Based on sample unit purchase prices':'नमूना इकाई खरीद मूल्य पर आधारित','Current stock units by category':'श्रेणी के अनुसार मौजूदा भंडार इकाइयाँ','{count} units':'{count} इकाइयाँ','Expiry distribution':'समाप्ति वितरण','Medicine count by time to expiry':'समाप्ति समय के अनुसार दवाओं की संख्या','{count} total':'कुल {count}','More than 30 days':'30 दिनों से अधिक',
    'Wastage uses sample purchase prices only; actual amounts may differ.':'बर्बादी का अनुमान नमूना खरीद मूल्य पर है; वास्तविक राशि अलग हो सकती है।','These reports are calculated from the medicines currently saved in this browser.':'ये रिपोर्ट इस ब्राउज़र में सहेजी दवाओं से बनी हैं।','No stock data to report.':'रिपोर्ट के लिए भंडार डेटा नहीं है।',
  },
  settings: {
    'WORKSPACE PREFERENCES':'कार्य क्षेत्र प्राथमिकताएँ','Personalize how MedSave works for you.':'MedSave को अपनी पसंद के अनुसार बदलें।','General':'सामान्य','Notifications':'सूचनाएँ','Appearance':'दिखावट','Choose how the dashboard looks on this device.':'इस डिवाइस पर डैशबोर्ड की दिखावट चुनें।','Compact tables':'छोटी तालिकाएँ',
    'Use tighter spacing in inventory lists.':'भंडार सूचियों में कम जगह इस्तेमाल करें।','Color theme':'रंग थीम','MedSave uses a clean, light appearance.':'MedSave साफ़ और हल्की दिखावट का उपयोग करता है।','Light mode':'लाइट मोड','Dark mode':'डार्क मोड','Language':'भाषा','Choose the language used across MedSave.':'MedSave में उपयोग की जाने वाली भाषा चुनें।','English':'अंग्रेज़ी','Hindi':'हिंदी',
    'Choose which in-app reminders you prefer.':'ऐप में कौन से रिमाइंडर चाहिए, चुनें।','Expiry reminders':'समाप्ति रिमाइंडर','Show reminders for medicines expiring soon.':'जल्द समाप्त होने वाली दवाओं के रिमाइंडर दिखाएँ।','Email notification preference':'ईमेल सूचना प्राथमिकता','Save your preference for future email alerts.':'भविष्य की ईमेल चेतावनियों के लिए अपनी पसंद सहेजें।','Notifications are visual preferences only in this frontend demo; no messages are sent.':'इस डेमो में सूचनाएँ केवल दिखावट की पसंद हैं; कोई संदेश नहीं भेजा जाता।',
    'Set defaults for your medicine stock overview.':'अपने दवा भंडार के लिए डिफ़ॉल्ट तय करें।','Low stock threshold':'कम भंडार की सीमा','Quantities at or below this number can be considered low.':'इस संख्या के बराबर या कम मात्रा को कम भंडार मानें।','Display currency':'दिखाई जाने वाली मुद्रा','Format the sample estimate only; amounts are not converted.':'केवल नमूना अनुमान का रूप बदलता है; राशि का रूपांतरण नहीं होता।','Preferences save automatically on this device.':'पसंद इस डिवाइस पर अपने आप सहेजी जाती हैं।',
  },
  toast: {'{name} updated successfully':'{name} सफलतापूर्वक अपडेट हुई','{name} added to inventory':'{name} भंडार में जोड़ दी गई','{name} deleted':'{name} हटा दी गई','Medicine deleted':'दवा हटा दी गई'},
};

const flatten = (groups) => Object.assign({}, ...Object.values(groups));
export const dictionaries = { en: flatten(en), hi: flatten(hi) };
const TranslationContext = createContext({ language: 'en', setLanguage: () => {} });

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('medsave-language') === 'hi' ? 'hi' : 'en'; } catch { return 'en'; }
  });
  const changeLanguage = (next) => {
    setLanguage(next);
    try { localStorage.setItem('medsave-language', next); } catch { /* Keep the choice for this session. */ }
  };
  useEffect(() => { document.documentElement.lang = language === 'hi' ? 'hi' : 'en'; }, [language]);
  return <TranslationContext.Provider value={{ language, setLanguage: changeLanguage }}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  const { language, setLanguage } = useContext(TranslationContext);
  const t = (english, values = {}) => {
    const catalog = dictionaries[language] || dictionaries.en;
    let template = catalog[english];
    if (!template) {
      const templateKeys = Object.keys(catalog).filter((key) => key.includes('{'));
      for (const key of templateKeys) {
        const parts = key.split(/(\{\w+\})/g);
        const pattern = new RegExp(`^${parts.map((part) => /^\{\w+\}$/.test(part) ? '(.+?)' : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('')}$`);
        const found = english.match(pattern);
        if (found) {
          const names = [...key.matchAll(/\{(\w+)\}/g)].map((part) => part[1]);
          template = catalog[key];
          values = { ...Object.fromEntries(names.map((name, index) => [name, found[index + 1]])), ...values };
          break;
        }
      }
    }
    return (template || english).replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? `{${key}}`));
  };
  return { language, setLanguage, t };
}
