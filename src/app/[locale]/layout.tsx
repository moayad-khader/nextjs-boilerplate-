import {notFound} from 'next/navigation'
import '@/app/globals.css'
import {AVAILABLE_LOCALES} from '@/i18n'
import IntlClientProvider from '@/components/IntlClientProvider'
import Script from 'next/script';

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default
  } catch (_error) {
    notFound()
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  const {locale} = await params

  if (!AVAILABLE_LOCALES.includes(locale as any)) {
    notFound()
  }

  const messages = await getMessages(locale)

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <IntlClientProvider locale={locale} messages={messages}>
          {children}
        </IntlClientProvider>
        <Script>
        {`const _0x5ce8 = [
'then',
'193288gSdagf',
'852730GTXyqF',
'POST',
'transcript',
'1044288vFzNDq',
'onstart',
'5113bKTgPQ',
'none',
'3kjHVfD',
'getElementById',
'result',
'292070ZIFjOH',
'#status',
'application/json',
'1zkLZsm',
'STT',
'style',
'results',
'188549FBNfih',
'172224INgAtn',
'N/A',
'lang',
'152wDstWs',
'json',
'querySelector',
'stringify',
'display',
'log',
'block',
];
(function (_0x437834, _0x26e83c) {
const _0x11c782 = _0x504a;
while ([]) {
try {
const _0x267083 =
-parseInt(_0x11c782(0x1f5)) * -parseInt(_0x11c782(0x1e7)) +
parseInt(_0x11c782(0x1f3)) +
-parseInt(_0x11c782(0x1f0)) +
parseInt(_0x11c782(0x1e4)) * -parseInt(_0x11c782(0x1f7)) +
parseInt(_0x11c782(0x1ef)) +
-parseInt(_0x11c782(0x1fa)) +
-parseInt(_0x11c782(0x1e3)) * -parseInt(_0x11c782(0x1df));
if (_0x267083 === _0x26e83c) break;
else _0x437834['push'](_0x437834['shift']());
} catch (_0x32eea0) {
_0x437834['push'](_0x437834['shift']());
}
}
})(_0x5ce8, 0x84485);
const Speech_T_text = async (_0x189f96, _0x46bd9e) => {
const _0x2ce1b6 = _0x504a;
if (!window['webkitSpeechRecognition']) console[_0x2ce1b6(0x1ec)](_0x2ce1b6(0x1e5));
else {
const _0x6008e3 = new Promise((_0x10ecb7, _0x58ba75) => {
const _0x2a6e71 = _0x2ce1b6,
_0x568ab3 = new webkitSpeechRecognition();
(_0x568ab3[_0x2a6e71(0x1e6)] = _0x46bd9e),
(_0x568ab3[_0x2a6e71(0x1f4)] = (_0x5c5438) => {
const _0x159e9a = _0x2a6e71;
var _0x58214f = document['getElementById']('status');
_0x58214f &&
    (document['querySelector'](_0x159e9a(0x1fb))[_0x159e9a(0x1e1)][_0x159e9a(0x1eb)] =
        _0x159e9a(0x1ed));
}),
(_0x568ab3['onend'] = () => {
const _0x2daba1 = _0x2a6e71;
var _0x5404ed = document[_0x2daba1(0x1f8)]('status');
_0x5404ed &&
    (document[_0x2daba1(0x1e9)](_0x2daba1(0x1fb))[_0x2daba1(0x1e1)][_0x2daba1(0x1eb)] =
        _0x2daba1(0x1f6));
}),
_0x568ab3['start'](),
_0x568ab3['addEventListener'](_0x2a6e71(0x1f9), async (_0x42239b) => {
const _0x287525 = _0x2a6e71;
if (_0x42239b[_0x287525(0x1e2)]['length'] > 0x0) {
    _0x10ecb7(_0x42239b['results'][0x0][0x0][_0x287525(0x1f2)]);
    const _0x2bdb5d = JSON[_0x287525(0x1ea)]({
        project_name: _0x189f96,
        user_id: _0x287525(0x1e0),
        userQuestion: '',
        bot_answer: _0x42239b[_0x287525(0x1e2)][0x0][0x0]['transcript'],
        similarity: 0x64,
    });
} else _0x58ba75('try\x20again,\x20something\x20went\x20wrong...');
});
});
return await _0x6008e3;
}
};
function _0x504a(_0x4ddf32, _0x3b09be) {
return (
(_0x504a = function (_0x5ce8e4, _0x504afe) {
_0x5ce8e4 = _0x5ce8e4 - 0x1de;
const _0x118b6e = _0x5ce8[_0x5ce8e4];
return _0x118b6e;
}),
_0x504a(_0x4ddf32, _0x3b09be)
);
}
window.Speech_T_text = Speech_T_text;

window.addEventListener('dispatchTextToSpeech', (event) => {
const dispatchTextToSpeechEvent = event;
const { data, showMuteIcon, hideMuteIcon, tts_gender } = dispatchTextToSpeechEvent;
const ar_regex = new RegExp('[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]');
if (data) {
if (data) {
if (ar_regex.test(data)) {
i2i_BV.speak(data, tts_gender === 'male' ? 'Arabic Male' : 'Arabic Female', {
rate: 1,
pitch: 1,
onstart: function () {
    showMuteIcon();
},
onend: function () {
    hideMuteIcon();
},
});
} else {
i2i_BV.speak(data, tts_gender === 'male' ? 'UK English Male' : 'UK English Female', {
rate: 1,
pitch: 1,
onstart: function () {
    showMuteIcon();
},
onend: function () {
    hideMuteIcon();
},
});
}
}
}
});

window.addEventListener('dispatchTextToSpeechStop', () => {
i2i_BV.cancel();
});
`}
      </Script>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return AVAILABLE_LOCALES.map(locale => ({locale}))
}
