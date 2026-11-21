import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, AlertTriangle, HeartPulse, Utensils, Hand, ShieldPlus, Syringe } from 'lucide-react';

interface ExplorerProps {
  topicId: string;
}

export const InteractiveExplorer: React.FC<ExplorerProps> = ({ topicId }) => {
  switch (topicId) {
    case 'intro-health':
      return <HealthPillarsExplorer />;
    case 'nutrition':
      return <BalancedPlateExplorer />;
    case 'personal-hygiene':
      return <HandwashingTimerExplorer />;
    case 'first-aid':
      return <FirstAidDecisionExplorer />;
    case 'vaccination':
      return <VaccineScheduleExplorer />;
    default:
      return null;
  }
};

const HealthPillarsExplorer: React.FC = () => {
  const [selected, setSelected] = useState<'physical' | 'mental' | 'social'>('physical');

  const data = {
    physical: {
      title: 'शारीरिक स्वास्थ्य',
      focus: 'शरीरको संरचना र दैनिक ऊर्जा',
      signs: [
        'बिहान उठ्दा फुर्तिलो र ताजा महसुस हुनु',
        'उमेर र उचाइ अनुसार सन्तुलित तौल र राम्रो पाचन हुनु',
        'दैनिक कामकाज र हिँडडुल गर्दा छिट्टै थकान नलाग्नु'
      ],
      connection:
        'जब शरीर स्वस्थ हुन्छ, दिमागले स्पष्ट सोच्न सक्छ र परिवार–समाजमा सक्रिय रहन ऊर्जा मिल्छ।'
    },
    mental: {
      title: 'मानसिक स्वास्थ्य',
      focus: 'मनको शान्ति र भावनात्मक सन्तुलन',
      signs: [
        'दैनिक समस्या र तनावलाई धैर्यपूर्वक समाधान गर्न सक्नु',
        'आफ्ना भावना (खुसी, दुःख, रिस) लाई स्वस्थ ढङ्गले व्यक्त गर्नु',
        'राति ७–८ घण्टा मस्त निद्रा लाग्नु र काममा ध्यान केन्द्रित हुनु'
      ],
      connection:
        'अत्यधिक मानसिक तनावले निद्रा बिगार्छ, रक्तचाप बढाउँछ र शरीरको रोग प्रतिरोधात्मक क्षमता कमजोर पार्छ।'
    },
    social: {
      title: 'सामाजिक स्वास्थ्य',
      focus: 'सम्बन्ध, सहकार्य र सामुदायिक सद्भाव',
      signs: [
        'परिवार, साथी र छिमेकीसँग सम्मानजनक र खुला संवाद हुनु',
        'सङ्कटको बेला अरूको सहयोग लिन र दिन सहज महसुस हुनु',
        'सामाजिक गतिविधि र सामूहिक सफाइ वा सचेतनामा सहभागी हुनु'
      ],
      connection:
        'बलियो पारिवारिक र सामाजिक साथले एक्लोपन घटाउँछ र कठिन परिस्थितिमा मानसिक बल प्रदान गर्छ।'
    }
  };

  const active = data[selected];

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <HeartPulse className="h-5 w-5 text-teal-700 shrink-0" />
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              स्वास्थ्यका तीन आयाम अन्वेषक
            </h4>
            <p className="text-xs text-slate-600">
              तलको प्रत्येक आयाममा क्लिक गरी तिनको आपसी सम्बन्ध बुझ्नुहोस्
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1">
          <button
            type="button"
            onClick={() => setSelected('physical')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selected === 'physical'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            शारीरिक
          </button>
          <button
            type="button"
            onClick={() => setSelected('mental')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selected === 'mental'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            मानसिक
          </button>
          <button
            type="button"
            onClick={() => setSelected('social')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selected === 'social'
                ? 'bg-white text-teal-800 shadow-xs'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            सामाजिक
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-xs font-medium text-teal-700">{active.focus}</div>
          <h5 className="mt-1 text-lg font-semibold text-slate-900">{active.title}का मुख्य सूचक</h5>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-700 leading-relaxed">
            {active.signs.map((sign, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-teal-700 shrink-0" />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5">
          <div>
            <div className="text-xs font-medium text-slate-500">अन्तरसम्बन्ध</div>
            <h5 className="mt-1 text-base font-semibold text-slate-900">
              अन्य आयामसँग कसरी जोडिन्छ?
            </h5>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-700">{active.connection}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            सन्तुलन सूत्र: शारीरिक + मानसिक + सामाजिक = पूर्ण स्वास्थ्य
          </div>
        </div>
      </div>
    </div>
  );
};

const BalancedPlateExplorer: React.FC = () => {
  const [part, setPart] = useState<'veggies' | 'grains' | 'protein' | 'water'>('veggies');

  const portions = {
    veggies: {
      ratio: '५०% (आधा थाली)',
      title: 'हरियो सागपात, तरकारी र फलफूल',
      examples: 'रायो/पालुङ्गो साग, काउली, फर्सी, गाँजर, काँक्रो, गोलभेंडा, मौसम अनुसारका फलफूल',
      benefit: 'भिटामिन, मिनरल्स र पाचन रेसा (Fiber) प्रदान गरी रोगसँग लड्ने शक्ति बढाउँछ।'
    },
    grains: {
      ratio: '२५% (एक चौथाइ थाली)',
      title: 'अन्न तथा ऊर्जा दिने खाना (कार्बोहाइड्रेट)',
      examples: 'भात, गहुँको रोटी, कोदो वा फापरको ढिँडो, मकै, आलु',
      benefit: 'दैनिक कामकाज र मस्तिष्क सञ्चालनका लागि आवश्यक ऊर्जा दिन्छ; अन्नको मात्रा ठिक्क राख्दा मोटोपना नियन्त्रण हुन्छ।'
    },
    protein: {
      ratio: '२५% (एक चौथाइ थाली)',
      title: 'दाल, गेडागुडी र प्रोटिनयुक्त परिकार',
      examples: 'बाक्लो दाल, भटमास, चना, राजमा, दूध/दही, अण्डा, माछा वा थोरै मासु',
      benefit: 'शरीरका मांसपेशी, रगत र हड्डी बलियो बनाउँछ तथा बालबालिकाको वृद्धिमा सघाउँछ।'
    },
    water: {
      ratio: 'दैनिक ६–८ गिलास',
      title: 'शुद्ध र सफा पिउने पानी',
      examples: 'उमालेर सेलाएको वा फिल्टर गरिएको सफा पानी (गुलियो कोल्ड ड्रिंक्स होइन)',
      benefit: 'खाना पचाउन, पोषक तत्व शरीरभरि पुर्‍याउन र शरीरको तापक्रम सन्तुलित राख्न अनिवार्य छ।'
    }
  };

  const active = portions[part];

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <Utensils className="h-5 w-5 text-teal-700 shrink-0" />
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              सन्तुलित नेपाली थाली अनुपात अन्वेषक
            </h4>
            <p className="text-xs text-slate-600">
              थालीको कुन भागमा कति र के खाने भनेर छान्नुहोस्
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1">
          <button
            type="button"
            onClick={() => setPart('veggies')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              part === 'veggies' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            सागपात (५०%)
          </button>
          <button
            type="button"
            onClick={() => setPart('grains')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              part === 'grains' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            अन्न (२५%)
          </button>
          <button
            type="button"
            onClick={() => setPart('protein')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              part === 'protein' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            प्रोटिन (२५%)
          </button>
          <button
            type="button"
            onClick={() => setPart('water')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              part === 'water' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            पानी
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 flex flex-col justify-center">
          <div className="text-xs text-slate-500">सिफारिस गरिएको भाग</div>
          <div className="mt-1 text-2xl font-bold text-teal-800 tabular-nums">{active.ratio}</div>
          <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-teal-700 transition-all duration-200"
              style={{
                width:
                  part === 'veggies'
                    ? '50%'
                    : part === 'grains' || part === 'protein'
                    ? '25%'
                    : '100%'
              }}
            />
          </div>
        </div>
        <div className="md:col-span-2 rounded-lg border border-slate-200 bg-white p-5">
          <h5 className="text-base font-semibold text-slate-900">{active.title}</h5>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">स्थानीय परिकार: </span>
            {active.examples}
          </p>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">शरीरलाई फाइदा: </span>
            {active.benefit}
          </p>
        </div>
      </div>
    </div>
  );
};

const HandwashingTimerExplorer: React.FC = () => {
  const steps = [
    '१. पानीले हात भिजाई पर्याप्त साबुन लगाउनुहोस् र हत्केला आपसमा रगड्नुहोस्।',
    '२. दायाँ हत्केलाले बायाँ हातको पछाडिको भाग र बायाँले दायाँको पछाडि मिच्नुहोस्।',
    '३. दुवै हातका औँलाहरू एकआपसमा फसाएर औँलाका कापहरू राम्ररी धुनुहोस्।',
    '४. औँलाका पछाडिका भाग र जोर्नीहरू अर्को हत्केलामा घुमाएर सफा गर्नुहोस्।',
    '५. दुवै हातका बुढी औँलाहरू रगडेर सफा गर्नुहोस्।',
    '६. औँलाका टुप्पा र नङ हत्केलामा घुमाई धुनुहोस्, अनि सफा पानीले पखाली सफा कपडाले पुछ्नुहोस्।'
  ];

  const [secondsLeft, setSecondsLeft] = useState(20);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      return;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, secondsLeft]);

  const elapsed = 20 - secondsLeft;
  const activeStepIndex = secondsLeft === 0 ? 5 : Math.min(5, Math.floor((elapsed / 20) * 6));

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <Hand className="h-5 w-5 text-teal-700 shrink-0" />
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              ६-चरणीय हात धुने अभ्यास र २० सेकेन्ड टाइमर
            </h4>
            <p className="text-xs text-slate-600">
              प्रत्येक चरण अभ्यास गर्न टाइमर सुरु गर्नुहोस् (न्यूनतम २० सेकेन्ड)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-lg font-semibold text-slate-900 tabular-nums px-2">
            {secondsLeft}s
          </span>
          <button
            type="button"
            onClick={() => {
              if (secondsLeft === 0) setSecondsLeft(20);
              setRunning((r) => !r);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-2 text-xs font-medium text-white hover:bg-teal-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{running ? 'रोक्नुहोस्' : secondsLeft === 0 ? 'फेरि सुरु गर्नुहोस्' : 'सुरु गर्नुहोस्'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setSecondsLeft(20);
            }}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>पुनः सेट</span>
          </button>
        </div>
      </div>

      {secondsLeft === 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-900">
          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0" />
          <span>२० सेकेन्ड पूरा भयो! अब सफा बग्दो पानीले पखाली सफा तौलियाले पुछ्नुहोस्।</span>
        </div>
      )}

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, idx) => {
          const isActive = (running || secondsLeft < 20) && activeStepIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-lg border p-3.5 text-sm leading-relaxed transition-colors ${
                isActive
                  ? 'border-teal-600 bg-white text-slate-900 shadow-xs'
                  : 'border-slate-200 bg-white/80 text-slate-700'
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FirstAidDecisionExplorer: React.FC = () => {
  const [scenario, setScenario] = useState<'burn' | 'cut' | 'faint' | 'nosebleed'>('burn');

  const scenarios = {
    burn: {
      title: 'तातो पानी, बाफ वा आगोले पोलेमा',
      immediate: [
        'तुरुन्त आगो वा तातो स्रोतबाट टाढा हटाउनुहोस् र पोलेको भागमा कसिलो घडी/गहना तुरुन्त फुकाल्नुहोस्।',
        '१५ देखि २० मिनेटसम्म सफा, चिसो बग्दो धाराको पानीमुनि राख्नुहोस्।',
        'सफा सुती कपडा वा नटाँसिने सफा गजले हल्का छोप्नुहोस्।'
      ],
      avoid: 'टुथपेस्ट, घिउ, तेल, अण्डा, बरफ वा पानीको फोका फुटाउने काम कहिल्यै नगर्नुहोस्।',
      referral: 'अनुहार, हत्केला, पैताला, जोर्नी वा शरीरको ठूलो भाग जलेमा तुरुन्त अस्पताल लैजानुहोस्।'
    },
    cut: {
      title: 'सामान्य काटिएको वा रगत बगेको घाउमा',
      immediate: [
        'सहायता दिनुअघि हात धुनुहोस् र घाउलाई सफा बग्दो पानीले राम्ररी पखाल्नुहोस्।',
        'सफा कपडा वा कीटाणुरहित गजले ५–१० मिनेट हल्का थिचेर रगत रोक्नुहोस्।',
        'रगत रोकिएपछि सफा पट्टी लगाउनुहोस्।'
      ],
      avoid: 'घाउमा माटो, खुर्सानी, गोबर, सुर्ती वा फोहोर टालो नराख्नुहोस्।',
      referral: '१० मिनेट थिच्दा पनि रगत नरोकिएमा, घाउ गहिरो भएमा वा खिया लागेको वस्तुले काटेमा टिटानस खोप र टाँका लागि स्वास्थ्य संस्था जानुहोस्।'
    },
    faint: {
      title: 'कोही अचानक बेहोस भएमा',
      immediate: [
        'व्यक्तिलाई समथर सुरक्षित ठाउँमा उत्तानो सुताई खुट्टा करिब १ फिट माथि उठाउनुहोस्।',
        'कसिलो टाँक, बेल्ट वा सल खुकुलो पार्नुहोस् र हावा आउन भीड हटाउनुहोस्।',
        'सास चलिरहेको छ तर होस नआएमा कोल्टो (Recovery Position) पार्नुहोस्।'
      ],
      avoid: 'बेहोस व्यक्तिको मुखमा पानी वा कुनै खानेकुरा नखन्याउनुहोस् र जबरजस्ती नबसाउनुहोस्।',
      referral: '१–२ मिनेटभित्र होस नआएमा, सास फेर्न गाह्रो भएमा वा छाती दुखेमा तुरुन्त १०२ मा फोन गरी अस्पताल लैजानुहोस्।'
    },
    nosebleed: {
      title: 'नाकबाट रगत बगेमा',
      immediate: [
        'व्यक्तिलाई सिधा बसाएर टाउको अलिकति अगाडि झुकाउनुहोस् (पछाडि होइन)।',
        'बुढी औँला र चोर औँलाले नाकको नरम भाग लगातार १० मिनेट थिचिराख्नुहोस् र मुखबाट सास फेर्न लगाउनुहोस्।',
        'सकेमा नाकको माथिल्लो भागमा चिसो कपडा राख्नुहोस्।'
      ],
      avoid: 'टाउको पछाडि नलैजानुहोस् र नाकभित्र कपास वा कागज नकोच्नुहोस्।',
      referral: '२० मिनेट थिच्दा पनि रगत नरोकिएमा वा टाउकोमा चोट लागेपछि रगत बगेको भएमा तुरुन्त अस्पताल जानुहोस्।'
    }
  };

  const active = scenarios[scenario];

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <ShieldPlus className="h-5 w-5 text-teal-700 shrink-0" />
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              प्राथमिक उपचार अवस्था मार्गदर्शक
            </h4>
            <p className="text-xs text-slate-600">
              अवस्था छनोट गरी तत्काल चाल्नुपर्ने सुरक्षित कदम हेर्नुहोस्
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1">
          <button
            type="button"
            onClick={() => setScenario('burn')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              scenario === 'burn' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            पोलेको/जलेको
          </button>
          <button
            type="button"
            onClick={() => setScenario('cut')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              scenario === 'cut' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            काटिएको/घाउ
          </button>
          <button
            type="button"
            onClick={() => setScenario('faint')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              scenario === 'faint' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            बेहोस हुँदा
          </button>
          <button
            type="button"
            onClick={() => setScenario('nosebleed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              scenario === 'nosebleed' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            नाकबाट रगत
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <h5 className="text-base font-semibold text-slate-900">{active.title}</h5>
          <ol className="mt-3 space-y-2 text-sm text-slate-700 leading-relaxed">
            {active.immediate.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono text-xs font-semibold text-teal-700 mt-0.5 shrink-0">
                  ०{i + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-4 text-sm text-slate-800">
            <div className="font-semibold text-rose-800">✕ नगर्नुपर्ने काम</div>
            <p className="mt-1 leading-relaxed">{active.avoid}</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 text-sm text-slate-800">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>अस्पताल लैजानुपर्ने अवस्था</span>
            </div>
            <p className="mt-1 leading-relaxed">{active.referral}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const VaccineScheduleExplorer: React.FC = () => {
  const [stage, setStage] = useState<'all' | 'birth' | 'weeks' | 'months' | 'maternal'>('all');

  const items = [
    {
      stage: 'birth',
      age: 'जन्मने बित्तिकै (१ वर्षभित्र)',
      vaccine: 'बीसीजी (BCG)',
      protects: 'गम्भीर बाल क्षयरोग',
      dose: '१ मात्रा (बायाँ पाखुराको छालामा)'
    },
    {
      stage: 'weeks',
      age: '६, १० र १४ हप्ता',
      vaccine: 'पेन्टाभ्यालेन्ट, OPV (पोलियो), रोटा र PCV',
      protects: 'भ्यागुते रोग, लहरेखोकी, धनुष्टङ्कार, हेपाटाइटिस बी, निमोनिया, रोटा पखाला',
      dose: '३ मात्रा (तोकिएको अन्तरालमा) + ६ र १४ हप्तामा fIPV'
    },
    {
      stage: 'months',
      age: '९, १२ र १५ महिना',
      vaccine: 'दादुरा–रुबेला (MR), JE (१२ महिना), TCV (१५ महिना)',
      protects: 'दादुरा, रुबेला, जापानिज इन्सेफलाइटिस र टाइफाइड',
      dose: 'दादुरा–रुबेला २ मात्रा (९ र १५ महिनामा)'
    },
    {
      stage: 'maternal',
      age: 'गर्भावस्था',
      vaccine: 'टीडी (TD) खोप',
      protects: 'आमा र नवजात शिशुको धनुष्टङ्कार (टिटानस) तथा भ्यागुते रोग',
      dose: 'पहिले नलगाएको भए १ महिनाको फरकमा २ मात्रा'
    }
  ];

  const filtered = stage === 'all' ? items : items.filter((item) => item.stage === stage);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2.5">
          <Syringe className="h-5 w-5 text-teal-700 shrink-0" />
          <div>
            <h4 className="text-base font-semibold text-slate-900">
              उमेर अनुसार खोप तालिका फिल्टर
            </h4>
            <p className="text-xs text-slate-600">
              उमेर चरण छान्नुहोस् र आवश्यक खोपहरूको विवरण हेर्नुहोस्
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1">
          {[
            { id: 'all', label: 'सबै चरण' },
            { id: 'birth', label: 'जन्मदा' },
            { id: 'weeks', label: '६–१४ हप्ता' },
            { id: 'months', label: '९–१५ महिना' },
            { id: 'maternal', label: 'गर्भावस्था' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStage(tab.id as typeof stage)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                stage === tab.id ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {filtered.map((item, idx) => (
          <div key={idx} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-teal-700">{item.age}</div>
            <div className="mt-1 text-base font-semibold text-slate-900">{item.vaccine}</div>
            <p className="mt-1.5 text-sm text-slate-700">
              <span className="font-medium text-slate-900">सुरक्षा: </span>
              {item.protects}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.dose}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
