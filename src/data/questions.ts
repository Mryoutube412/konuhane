export interface Question {
  id: string;
  subject: Subject;
  topic: string;
  difficulty: 'kolay' | 'orta' | 'zor';
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  tags: string[];
}

export type Subject = 'turkce' | 'matematik' | 'fen' | 'tarih' | 'ingilizce' | 'din';

export interface TopicInfo {
  id: string;
  name: string;
  icon: string;
}

export interface SubjectInfo {
  id: Subject;
  name: string;
  icon: string;
  gradient: string;
  topics: TopicInfo[];
}

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'turkce', name: 'Türkçe', icon: '📖', gradient: 'gradient-turkce',
    topics: [
      { id: 'es_zit_anlam', name: 'Eş-Zıt Anlam', icon: '🔄' },
      { id: 'sozcuk_turleri', name: 'Sözcük Türleri', icon: '📝' },
      { id: 'deyimler', name: 'Deyimler', icon: '💬' },
      { id: 'atasozleri', name: 'Atasözleri', icon: '📜' },
      { id: 'tamlama', name: 'İsim Tamlaması', icon: '🔗' },
      { id: 'fiiller', name: 'Fiiller', icon: '🏃' },
      { id: 'ses_bilgisi', name: 'Ses Bilgisi', icon: '🔊' },
      { id: 'yazim_kurallari', name: 'Yazım Kuralları', icon: '✍️' },
    ],
  },
  {
    id: 'matematik', name: 'Matematik', icon: '🔢', gradient: 'gradient-matematik',
    topics: [
      { id: 'toplama_cikarma', name: 'Toplama-Çıkarma', icon: '➕' },
      { id: 'carpma_bolme', name: 'Çarpma-Bölme', icon: '✖️' },
      { id: 'kesirler', name: 'Kesirler', icon: '🥧' },
      { id: 'geometri', name: 'Geometri', icon: '📐' },
      { id: 'uslu_sayilar', name: 'Üslü Sayılar', icon: '🔢' },
      { id: 'denklemler', name: 'Denklemler', icon: '⚖️' },
      { id: 'oran_oranti', name: 'Oran-Orantı', icon: '📊' },
      { id: 'olasilik', name: 'Olasılık', icon: '🎲' },
    ],
  },
  {
    id: 'fen', name: 'Fen Bilimleri', icon: '🔬', gradient: 'gradient-fen',
    topics: [
      { id: 'madde', name: 'Madde ve Özellikleri', icon: '🧪' },
      { id: 'canlilar', name: 'Canlılar Dünyası', icon: '🌿' },
      { id: 'kuvvet', name: 'Kuvvet ve Hareket', icon: '🏋️' },
      { id: 'elektrik', name: 'Elektrik', icon: '⚡' },
      { id: 'isik_ses', name: 'Işık ve Ses', icon: '💡' },
      { id: 'dunya_uzay', name: 'Dünya ve Uzay', icon: '🌍' },
      { id: 'kimya', name: 'Kimyasal Değişimler', icon: '⚗️' },
      { id: 'ekosistem', name: 'Ekosistem', icon: '🌳' },
    ],
  },
  {
    id: 'tarih', name: 'T.C. İnkılap Tarihi', icon: '🏛️', gradient: 'gradient-tarih',
    topics: [
      { id: 'kurtulus_savasi', name: 'Kurtuluş Savaşı', icon: '⚔️' },
      { id: 'cumhuriyet', name: 'Cumhuriyetin İlanı', icon: '🇹🇷' },
      { id: 'ataturk_ilkeleri', name: 'Atatürk İlkeleri', icon: '📋' },
      { id: 'inkilaplar', name: 'İnkılaplar', icon: '🔄' },
      { id: 'tbmm', name: 'TBMM', icon: '🏛️' },
      { id: 'antlasmalar', name: 'Antlaşmalar', icon: '📜' },
      { id: 'milli_mucadele', name: 'Milli Mücadele', icon: '🎖️' },
      { id: 'cok_partili', name: 'Çok Partili Hayat', icon: '🗳️' },
    ],
  },
  {
    id: 'ingilizce', name: 'İngilizce', icon: '🌍', gradient: 'gradient-ingilizce',
    topics: [
      { id: 'greetings', name: 'Greetings', icon: '👋' },
      { id: 'present_tense', name: 'Present Tense', icon: '⏰' },
      { id: 'past_tense', name: 'Past Tense', icon: '⏪' },
      { id: 'vocabulary', name: 'Vocabulary', icon: '📚' },
      { id: 'prepositions', name: 'Prepositions', icon: '📍' },
      { id: 'comparatives', name: 'Comparatives', icon: '⚖️' },
      { id: 'reading', name: 'Reading', icon: '📖' },
      { id: 'modals', name: 'Modal Verbs', icon: '🔑' },
    ],
  },
  {
    id: 'din', name: 'Din Kültürü', icon: '☪️', gradient: 'gradient-din',
    topics: [
      { id: 'ibadet', name: 'İbadet', icon: '🕌' },
      { id: 'kuran', name: "Kur'an-ı Kerim", icon: '📖' },
      { id: 'peygamberler', name: 'Peygamberler', icon: '⭐' },
      { id: 'ahlak', name: 'Ahlak', icon: '💎' },
      { id: 'islam_tarihi', name: 'İslam Tarihi', icon: '📅' },
      { id: 'inanc', name: 'İnanç', icon: '🤲' },
      { id: 'hadis', name: 'Hadis', icon: '📜' },
      { id: 'degerler', name: 'Değerler Eğitimi', icon: '🌟' },
    ],
  },
];

// ─── SORU BANKASI ───
export const questions: Question[] = [
  // ═══════════════ TÜRKÇE ═══════════════
  // Eş-Zıt Anlam
  { id: 'tc001', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'kolay', question: '"Güzel" kelimesinin eş anlamlısı hangisidir?', options: ['Çirkin', 'Hoş', 'Kötü', 'Sert'], correctIndex: 1, explanation: 'Güzel = Hoş', tags: ['eş anlam'] },
  { id: 'tc002', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'kolay', question: '"Büyük" kelimesinin zıt anlamlısı nedir?', options: ['Geniş', 'Uzun', 'Küçük', 'Yüksek'], correctIndex: 2, explanation: 'Büyük ↔ Küçük', tags: ['zıt anlam'] },
  { id: 'tc003', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'kolay', question: '"Hızlı" kelimesinin eş anlamlısı hangisidir?', options: ['Yavaş', 'Süratli', 'Ağır', 'Durgun'], correctIndex: 1, explanation: 'Hızlı = Süratli', tags: ['eş anlam'] },
  { id: 'tc004', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'orta', question: '"Cesur" kelimesinin zıt anlamlısı hangisidir?', options: ['Yiğit', 'Korkak', 'Güçlü', 'Kahraman'], correctIndex: 1, explanation: 'Cesur ↔ Korkak', tags: ['zıt anlam'] },
  { id: 'tc005', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'orta', question: '"Yoksul" kelimesinin eş anlamlısı hangisidir?', options: ['Zengin', 'Fakir', 'Varlıklı', 'Mutlu'], correctIndex: 1, explanation: 'Yoksul = Fakir', tags: ['eş anlam'] },
  { id: 'tc006', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'orta', question: '"Keder" kelimesinin zıt anlamlısı hangisidir?', options: ['Üzüntü', 'Hüzün', 'Sevinç', 'Acı'], correctIndex: 2, explanation: 'Keder ↔ Sevinç', tags: ['zıt anlam'] },
  { id: 'tc007', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'zor', question: '"Müstakil" kelimesinin eş anlamlısı hangisidir?', options: ['Bağımlı', 'Bağımsız', 'Ortak', 'Beraber'], correctIndex: 1, explanation: 'Müstakil = Bağımsız', tags: ['eş anlam'] },
  { id: 'tc008', subject: 'turkce', topic: 'es_zit_anlam', difficulty: 'zor', question: '"Mütevazı" kelimesinin anlamı nedir?', options: ['Kibirli', 'Alçak gönüllü', 'Zengin', 'Güçlü'], correctIndex: 1, explanation: 'Mütevazı = Alçak gönüllü', tags: ['eş anlam'] },

  // Sözcük Türleri
  { id: 'tc009', subject: 'turkce', topic: 'sozcuk_turleri', difficulty: 'kolay', question: 'Hangisi bir isimdir?', options: ['Koşmak', 'Güzel', 'Kitap', 'Hızla'], correctIndex: 2, explanation: 'Kitap bir isimdir.', tags: ['isim'] },
  { id: 'tc010', subject: 'turkce', topic: 'sozcuk_turleri', difficulty: 'kolay', question: 'Hangisi bir sıfattır?', options: ['Araba', 'Kırmızı', 'Koşmak', 'Çabucak'], correctIndex: 1, explanation: 'Kırmızı bir sıfattır.', tags: ['sıfat'] },
  { id: 'tc011', subject: 'turkce', topic: 'sozcuk_turleri', difficulty: 'kolay', question: 'Hangisi bir fiildir?', options: ['Masa', 'Büyük', 'Yürümek', 'Hızlı'], correctIndex: 2, explanation: 'Yürümek bir fiildir.', tags: ['fiil'] },
  { id: 'tc012', subject: 'turkce', topic: 'sozcuk_turleri', difficulty: 'orta', question: 'Aşağıdakilerden hangisi bir bağlaçtır?', options: ['Güzel', 'Fakat', 'Hızla', 'Kitap'], correctIndex: 1, explanation: 'Fakat bir bağlaçtır.', tags: ['bağlaç'] },
  { id: 'tc013', subject: 'turkce', topic: 'sozcuk_turleri', difficulty: 'orta', question: 'Hangisi bir zarftır?', options: ['Ev', 'Güzel', 'Çabucak', 'Araba'], correctIndex: 2, explanation: 'Çabucak bir zarftır (belirteç).', tags: ['zarf'] },
  { id: 'tc014', subject: 'turkce', topic: 'sozcuk_turleri', difficulty: 'zor', question: '"Onu gördüm" cümlesindeki "onu" hangi sözcük türüdür?', options: ['İsim', 'Sıfat', 'Zamir', 'Zarf'], correctIndex: 2, explanation: '"Onu" bir kişi zamiridir.', tags: ['zamir'] },
  { id: 'tc015', subject: 'turkce', topic: 'sozcuk_turleri', difficulty: 'zor', question: '"Eyvah!" hangi sözcük türüdür?', options: ['Fiil', 'İsim', 'Ünlem', 'Bağlaç'], correctIndex: 2, explanation: 'Eyvah bir ünlemdir.', tags: ['ünlem'] },

  // Deyimler
  { id: 'tc016', subject: 'turkce', topic: 'deyimler', difficulty: 'kolay', question: '"Göz açıp kapayıncaya kadar" ne demektir?', options: ['Uzun sürede', 'Çok kısa sürede', 'Gözleri kapatarak', 'Dikkatli bakarak'], correctIndex: 1, explanation: 'Çok kısa sürede anlamına gelir.', tags: ['deyim'] },
  { id: 'tc017', subject: 'turkce', topic: 'deyimler', difficulty: 'kolay', question: '"Ağzı açık kalmak" ne demektir?', options: ['Konuşamamak', 'Çok şaşırmak', 'Aç kalmak', 'Hastalanmak'], correctIndex: 1, explanation: 'Çok şaşırmak anlamına gelir.', tags: ['deyim'] },
  { id: 'tc018', subject: 'turkce', topic: 'deyimler', difficulty: 'orta', question: '"Gözden düşmek" ne demektir?', options: ['Yüksekten bakmak', 'İtibarını kaybetmek', 'Ağlamak', 'Görmemek'], correctIndex: 1, explanation: 'İtibarını kaybetmek anlamına gelir.', tags: ['deyim'] },
  { id: 'tc019', subject: 'turkce', topic: 'deyimler', difficulty: 'orta', question: '"Dil dökmek" ne demektir?', options: ['Konuşmamak', 'Tatlı dille kandırmaya çalışmak', 'Ağlamak', 'Yemek yemek'], correctIndex: 1, explanation: 'Tatlı dille kandırmaya çalışmak anlamına gelir.', tags: ['deyim'] },
  { id: 'tc020', subject: 'turkce', topic: 'deyimler', difficulty: 'zor', question: '"Çam devirmek" ne demektir?', options: ['Ağaç kesmek', 'Pot kırmak', 'Başarılı olmak', 'Çalışmak'], correctIndex: 1, explanation: 'Uygunsuz bir söz söylemek, pot kırmak.', tags: ['deyim'] },
  { id: 'tc021', subject: 'turkce', topic: 'deyimler', difficulty: 'zor', question: '"Devede kulak" ne demektir?', options: ['Çok büyük', 'Çok küçük, önemsiz', 'Hayvan', 'Güzel'], correctIndex: 1, explanation: 'Çok küçük, önemsiz anlamına gelir.', tags: ['deyim'] },

  // Atasözleri
  { id: 'tc022', subject: 'turkce', topic: 'atasozleri', difficulty: 'kolay', question: '"Damlaya damlaya..." devamı nedir?', options: ['Sel olur', 'Göl olur', 'Nehir olur', 'Deniz olur'], correctIndex: 1, explanation: 'Damlaya damlaya göl olur.', tags: ['atasözü'] },
  { id: 'tc023', subject: 'turkce', topic: 'atasozleri', difficulty: 'kolay', question: '"Sakla samanı..." devamı nedir?', options: ['Yak kışı', 'Gelir zamanı', 'Sat parayı', 'Bul yolunu'], correctIndex: 1, explanation: 'Sakla samanı gelir zamanı.', tags: ['atasözü'] },
  { id: 'tc024', subject: 'turkce', topic: 'atasozleri', difficulty: 'orta', question: '"Bir elin nesi var..." devamı nedir?', options: ['Beş parmağı', 'İki elin sesi var', 'Hiçbir şeyi', 'Çok gücü'], correctIndex: 1, explanation: 'Bir elin nesi var iki elin sesi var.', tags: ['atasözü'] },
  { id: 'tc025', subject: 'turkce', topic: 'atasozleri', difficulty: 'orta', question: '"Ağaç yaşken eğilir" atasözünün anlamı nedir?', options: ['Ağaçlar esnektir', 'Eğitim küçük yaşta verilmeli', 'Rüzgar etkisi', 'Doğa güzeldir'], correctIndex: 1, explanation: 'Eğitim küçük yaşta verilmelidir.', tags: ['atasözü'] },
  { id: 'tc026', subject: 'turkce', topic: 'atasozleri', difficulty: 'zor', question: '"Mum dibine ışık vermez" ne demektir?', options: ['Mumlar kötüdür', 'Kişi yakınlarına faydası olmaz', 'Karanlık kötüdür', 'Işık önemlidir'], correctIndex: 1, explanation: 'Kişi en yakınlarına faydası olmayabilir.', tags: ['atasözü'] },

  // Tamlama
  { id: 'tc027', subject: 'turkce', topic: 'tamlama', difficulty: 'kolay', question: '"Okul bahçesi" hangi tamlamadır?', options: ['Belirtili', 'Belirtisiz', 'Sıfat tamlaması', 'Fiil'], correctIndex: 1, explanation: 'Belirtisiz isim tamlamasıdır.', tags: ['tamlama'] },
  { id: 'tc028', subject: 'turkce', topic: 'tamlama', difficulty: 'orta', question: '"Okulun bahçesi" hangi tamlamadır?', options: ['Belirtili isim tamlaması', 'Belirtisiz', 'Sıfat tamlaması', 'Zincirleme'], correctIndex: 0, explanation: 'Belirtili isim tamlamasıdır.', tags: ['tamlama'] },
  { id: 'tc029', subject: 'turkce', topic: 'tamlama', difficulty: 'zor', question: '"Öğretmenin okulun bahçesi" hangi tamlamadır?', options: ['Belirtili', 'Belirtisiz', 'Zincirleme isim tamlaması', 'Sıfat'], correctIndex: 2, explanation: 'Zincirleme isim tamlamasıdır.', tags: ['tamlama'] },

  // Fiiller
  { id: 'tc030', subject: 'turkce', topic: 'fiiller', difficulty: 'kolay', question: '"Koşmak" hangi tür fiildir?', options: ['İş (kılış)', 'Durum', 'Oluş', 'Yardımcı'], correctIndex: 0, explanation: 'Koşmak bir iş/kılış fiilidir.', tags: ['fiil'] },
  { id: 'tc031', subject: 'turkce', topic: 'fiiller', difficulty: 'orta', question: '"Sararmak" hangi tür fiildir?', options: ['İş', 'Durum', 'Oluş', 'Yardımcı'], correctIndex: 2, explanation: 'Sararmak bir oluş fiilidir.', tags: ['fiil'] },
  { id: 'tc032', subject: 'turkce', topic: 'fiiller', difficulty: 'zor', question: '"Yaptırılmak" fiilinde kaç çatı eki vardır?', options: ['1', '2', '3', '4'], correctIndex: 1, explanation: 'Yap-tır-ıl-mak: ettirgen + edilgen = 2 çatı eki.', tags: ['fiil çatısı'] },

  // Ses Bilgisi
  { id: 'tc033', subject: 'turkce', topic: 'ses_bilgisi', difficulty: 'kolay', question: 'Türk alfabesinde kaç harf vardır?', options: ['26', '28', '29', '30'], correctIndex: 2, explanation: 'Türk alfabesinde 29 harf vardır.', tags: ['alfabe'] },
  { id: 'tc034', subject: 'turkce', topic: 'ses_bilgisi', difficulty: 'orta', question: 'Türkçede kaç ünlü harf vardır?', options: ['5', '6', '7', '8'], correctIndex: 3, explanation: 'Türkçede 8 ünlü harf vardır: a, e, ı, i, o, ö, u, ü', tags: ['ünlü'] },
  { id: 'tc035', subject: 'turkce', topic: 'ses_bilgisi', difficulty: 'zor', question: '"Kitap" kelimesine ünlü ile başlayan ek gelince ne olur?', options: ['Kitap olur', 'Kitabı olur', 'Kitapı olur', 'Kıtabı olur'], correctIndex: 1, explanation: 'Ünsüz yumuşaması: p→b, kitabı.', tags: ['ünsüz yumuşaması'] },

  // Yazım Kuralları
  { id: 'tc036', subject: 'turkce', topic: 'yazim_kurallari', difficulty: 'kolay', question: 'Cümle sonuna hangi işaret konur?', options: ['Virgül', 'Nokta', 'İki nokta', 'Noktalı virgül'], correctIndex: 1, explanation: 'Cümle sonuna nokta konur.', tags: ['noktalama'] },
  { id: 'tc037', subject: 'turkce', topic: 'yazim_kurallari', difficulty: 'orta', question: '"de/da" bağlacı ne zaman ayrı yazılır?', options: ['Her zaman', 'Hiçbir zaman', 'Cümleden çıkarılabiliyorsa', 'İsimden sonra'], correctIndex: 2, explanation: 'Bağlaç olan de/da cümleden çıkarılabilir ve ayrı yazılır.', tags: ['yazım'] },
  { id: 'tc038', subject: 'turkce', topic: 'yazim_kurallari', difficulty: 'zor', question: '"Ki" bağlacı ne zaman ayrı yazılır?', options: ['Her zaman bitişik', 'Her zaman ayrı', 'Bağlaç olduğunda ayrı', 'Hiçbir zaman'], correctIndex: 2, explanation: 'Ki bağlacı ayrı yazılır (halbuki, mademki, oysaki hariç).', tags: ['yazım'] },

  // ═══════════════ MATEMATİK ═══════════════
  // Toplama-Çıkarma
  { id: 'mt001', subject: 'matematik', topic: 'toplama_cikarma', difficulty: 'kolay', question: '15 + 27 = ?', options: ['41', '42', '43', '40'], correctIndex: 1, explanation: '15 + 27 = 42', tags: ['toplama'] },
  { id: 'mt002', subject: 'matematik', topic: 'toplama_cikarma', difficulty: 'kolay', question: '100 - 37 = ?', options: ['63', '67', '73', '53'], correctIndex: 0, explanation: '100 - 37 = 63', tags: ['çıkarma'] },
  { id: 'mt003', subject: 'matematik', topic: 'toplama_cikarma', difficulty: 'kolay', question: '256 + 144 = ?', options: ['300', '400', '500', '350'], correctIndex: 1, explanation: '256 + 144 = 400', tags: ['toplama'] },
  { id: 'mt004', subject: 'matematik', topic: 'toplama_cikarma', difficulty: 'orta', question: '1523 - 897 = ?', options: ['626', '636', '616', '726'], correctIndex: 0, explanation: '1523 - 897 = 626', tags: ['çıkarma'] },
  { id: 'mt005', subject: 'matematik', topic: 'toplama_cikarma', difficulty: 'orta', question: '(-5) + 8 = ?', options: ['-3', '3', '13', '-13'], correctIndex: 1, explanation: '(-5) + 8 = 3', tags: ['tam sayılar'] },
  { id: 'mt006', subject: 'matematik', topic: 'toplama_cikarma', difficulty: 'zor', question: '(-12) - (-7) = ?', options: ['-19', '-5', '5', '19'], correctIndex: 1, explanation: '(-12) - (-7) = -12 + 7 = -5', tags: ['tam sayılar'] },
  { id: 'mt007', subject: 'matematik', topic: 'toplama_cikarma', difficulty: 'zor', question: '|(-8) + 3| = ?', options: ['5', '-5', '11', '-11'], correctIndex: 0, explanation: '|(-8) + 3| = |-5| = 5', tags: ['mutlak değer'] },

  // Çarpma-Bölme
  { id: 'mt008', subject: 'matematik', topic: 'carpma_bolme', difficulty: 'kolay', question: '8 × 7 = ?', options: ['54', '55', '56', '57'], correctIndex: 2, explanation: '8 × 7 = 56', tags: ['çarpma'] },
  { id: 'mt009', subject: 'matematik', topic: 'carpma_bolme', difficulty: 'kolay', question: '72 ÷ 9 = ?', options: ['7', '8', '9', '6'], correctIndex: 1, explanation: '72 ÷ 9 = 8', tags: ['bölme'] },
  { id: 'mt010', subject: 'matematik', topic: 'carpma_bolme', difficulty: 'orta', question: '(-6) × 4 = ?', options: ['24', '-24', '10', '-10'], correctIndex: 1, explanation: '(-6) × 4 = -24', tags: ['çarpma'] },
  { id: 'mt011', subject: 'matematik', topic: 'carpma_bolme', difficulty: 'orta', question: '125 × 8 = ?', options: ['800', '900', '1000', '1100'], correctIndex: 2, explanation: '125 × 8 = 1000', tags: ['çarpma'] },
  { id: 'mt012', subject: 'matematik', topic: 'carpma_bolme', difficulty: 'zor', question: '(-3) × (-5) × (-2) = ?', options: ['30', '-30', '15', '-15'], correctIndex: 1, explanation: '(-3)×(-5)=15, 15×(-2)=-30', tags: ['çarpma'] },

  // Kesirler
  { id: 'mt013', subject: 'matematik', topic: 'kesirler', difficulty: 'kolay', question: '1/2 + 1/2 = ?', options: ['1', '2', '1/4', '2/4'], correctIndex: 0, explanation: '1/2 + 1/2 = 1', tags: ['kesir toplama'] },
  { id: 'mt014', subject: 'matematik', topic: 'kesirler', difficulty: 'kolay', question: '3/4 hangi ondalık sayıya eşittir?', options: ['0.25', '0.5', '0.75', '0.34'], correctIndex: 2, explanation: '3/4 = 0.75', tags: ['ondalık'] },
  { id: 'mt015', subject: 'matematik', topic: 'kesirler', difficulty: 'orta', question: '2/3 + 1/6 = ?', options: ['3/9', '5/6', '3/6', '1/2'], correctIndex: 1, explanation: '4/6 + 1/6 = 5/6', tags: ['kesir toplama'] },
  { id: 'mt016', subject: 'matematik', topic: 'kesirler', difficulty: 'zor', question: '(3/5) × (10/9) = ?', options: ['2/3', '30/45', '1/3', '6/9'], correctIndex: 0, explanation: '30/45 = 2/3', tags: ['kesir çarpma'] },

  // Geometri
  { id: 'mt017', subject: 'matematik', topic: 'geometri', difficulty: 'kolay', question: 'Bir üçgenin iç açıları toplamı kaç derecedir?', options: ['90°', '180°', '270°', '360°'], correctIndex: 1, explanation: 'Üçgenin iç açıları toplamı 180°', tags: ['açılar'] },
  { id: 'mt018', subject: 'matematik', topic: 'geometri', difficulty: 'kolay', question: 'Karenin kaç kenarı vardır?', options: ['3', '4', '5', '6'], correctIndex: 1, explanation: 'Karenin 4 kenarı vardır.', tags: ['kare'] },
  { id: 'mt019', subject: 'matematik', topic: 'geometri', difficulty: 'orta', question: 'Dikdörtgenin çevresi nasıl hesaplanır?', options: ['a × b', '2(a + b)', 'a + b', '4a'], correctIndex: 1, explanation: 'Çevre = 2(a + b)', tags: ['çevre'] },
  { id: 'mt020', subject: 'matematik', topic: 'geometri', difficulty: 'orta', question: 'Dairenin alanı formülü nedir?', options: ['2πr', 'πr²', 'πd', '2πr²'], correctIndex: 1, explanation: 'Dairenin alanı = πr²', tags: ['alan'] },
  { id: 'mt021', subject: 'matematik', topic: 'geometri', difficulty: 'zor', question: 'Kenar uzunluğu 5 cm olan küpün hacmi kaç cm³?', options: ['25', '50', '100', '125'], correctIndex: 3, explanation: '5³ = 125 cm³', tags: ['hacim'] },

  // Üslü Sayılar
  { id: 'mt022', subject: 'matematik', topic: 'uslu_sayilar', difficulty: 'kolay', question: '2³ kaçtır?', options: ['6', '8', '9', '12'], correctIndex: 1, explanation: '2³ = 2×2×2 = 8', tags: ['üs'] },
  { id: 'mt023', subject: 'matematik', topic: 'uslu_sayilar', difficulty: 'orta', question: '√144 kaçtır?', options: ['11', '12', '13', '14'], correctIndex: 1, explanation: '12² = 144', tags: ['kök'] },
  { id: 'mt024', subject: 'matematik', topic: 'uslu_sayilar', difficulty: 'zor', question: '2^10 kaçtır?', options: ['512', '1024', '2048', '256'], correctIndex: 1, explanation: '2^10 = 1024', tags: ['üs'] },

  // Denklemler
  { id: 'mt025', subject: 'matematik', topic: 'denklemler', difficulty: 'kolay', question: 'x + 5 = 12 ise x kaçtır?', options: ['5', '6', '7', '8'], correctIndex: 2, explanation: 'x = 12 - 5 = 7', tags: ['denklem'] },
  { id: 'mt026', subject: 'matematik', topic: 'denklemler', difficulty: 'orta', question: '3x - 6 = 9 ise x kaçtır?', options: ['3', '4', '5', '6'], correctIndex: 2, explanation: '3x = 15, x = 5', tags: ['denklem'] },
  { id: 'mt027', subject: 'matematik', topic: 'denklemler', difficulty: 'zor', question: 'x² - 5x + 6 = 0 denkleminin kökleri?', options: ['1, 6', '2, 3', '-2, -3', '1, 5'], correctIndex: 1, explanation: '(x-2)(x-3) = 0', tags: ['ikinci derece'] },

  // Oran-Orantı
  { id: 'mt028', subject: 'matematik', topic: 'oran_oranti', difficulty: 'kolay', question: '2/3 = x/9 ise x kaçtır?', options: ['4', '5', '6', '7'], correctIndex: 2, explanation: '2×9/3 = 6', tags: ['orantı'] },
  { id: 'mt029', subject: 'matematik', topic: 'oran_oranti', difficulty: 'orta', question: 'Bir sayının %25\'i 15 ise sayı kaçtır?', options: ['45', '50', '55', '60'], correctIndex: 3, explanation: '15 / 0.25 = 60', tags: ['yüzde'] },
  { id: 'mt030', subject: 'matematik', topic: 'oran_oranti', difficulty: 'zor', question: 'A ve B nin yaşları oranı 3/5. Toplam yaşları 40 ise A kaç yaşındadır?', options: ['12', '15', '18', '20'], correctIndex: 1, explanation: '3+5=8, 40/8=5, A=3×5=15', tags: ['oran'] },

  // Olasılık
  { id: 'mt031', subject: 'matematik', topic: 'olasilik', difficulty: 'kolay', question: 'Bir zarın 6 gelme olasılığı kaçtır?', options: ['1/2', '1/3', '1/4', '1/6'], correctIndex: 3, explanation: 'Zarın 6 olası sonucu var, 1/6.', tags: ['olasılık'] },
  { id: 'mt032', subject: 'matematik', topic: 'olasilik', difficulty: 'orta', question: 'Bir yazı-tura atışında iki kez üst üste yazı gelme olasılığı?', options: ['1/2', '1/3', '1/4', '1/8'], correctIndex: 2, explanation: '1/2 × 1/2 = 1/4', tags: ['olasılık'] },
  { id: 'mt033', subject: 'matematik', topic: 'olasilik', difficulty: 'zor', question: '52 kartlık desteden kırmızı As çekme olasılığı?', options: ['1/52', '2/52', '4/52', '1/26'], correctIndex: 1, explanation: '2 kırmızı As var: 2/52 = 1/26', tags: ['olasılık'] },

  // ═══════════════ FEN BİLİMLERİ ═══════════════
  // Madde
  { id: 'fn001', subject: 'fen', topic: 'madde', difficulty: 'kolay', question: 'Maddenin üç hali nelerdir?', options: ['Katı, sıvı, gaz', 'Katı, sıvı, plazma', 'Sıvı, gaz, buhar', 'Katı, buhar, gaz'], correctIndex: 0, explanation: 'Katı, sıvı ve gazdır.', tags: ['madde halleri'] },
  { id: 'fn002', subject: 'fen', topic: 'madde', difficulty: 'kolay', question: 'Suyun donma noktası kaç °C?', options: ['-10', '0', '10', '100'], correctIndex: 1, explanation: 'Su 0°C\'de donar.', tags: ['donma'] },
  { id: 'fn003', subject: 'fen', topic: 'madde', difficulty: 'orta', question: 'Hangisi bir bileşiktir?', options: ['Oksijen', 'Altın', 'Su', 'Demir'], correctIndex: 2, explanation: 'Su (H2O) bir bileşiktir.', tags: ['bileşik'] },
  { id: 'fn004', subject: 'fen', topic: 'madde', difficulty: 'orta', question: 'Maddenin 4. hali nedir?', options: ['Buhar', 'Plazma', 'Sıvı kristal', 'Jel'], correctIndex: 1, explanation: 'Plazma maddenin 4. halidir.', tags: ['plazma'] },
  { id: 'fn005', subject: 'fen', topic: 'madde', difficulty: 'zor', question: 'Suyun kimyasal formülü nedir?', options: ['CO2', 'H2O', 'O2', 'NaCl'], correctIndex: 1, explanation: 'H2O', tags: ['formül'] },
  { id: 'fn006', subject: 'fen', topic: 'madde', difficulty: 'zor', question: 'Yoğunluk formülü nedir?', options: ['m × V', 'm / V', 'V / m', 'F / A'], correctIndex: 1, explanation: 'd = m / V (kütle / hacim)', tags: ['yoğunluk'] },

  // Canlılar
  { id: 'fn007', subject: 'fen', topic: 'canlilar', difficulty: 'kolay', question: 'Fotosentez yapan organizma hangisidir?', options: ['Hayvanlar', 'Bitkiler', 'Mantarlar', 'Virüsler'], correctIndex: 1, explanation: 'Bitkiler fotosentez yapar.', tags: ['fotosentez'] },
  { id: 'fn008', subject: 'fen', topic: 'canlilar', difficulty: 'kolay', question: 'Hücrenin enerji merkezi hangisidir?', options: ['Çekirdek', 'Ribozom', 'Mitokondri', 'Golgi'], correctIndex: 2, explanation: 'Mitokondri enerji üretir.', tags: ['hücre'] },
  { id: 'fn009', subject: 'fen', topic: 'canlilar', difficulty: 'orta', question: 'Fotosentezde açığa çıkan gaz nedir?', options: ['CO2', 'N2', 'O2', 'H2'], correctIndex: 2, explanation: 'Oksijen açığa çıkar.', tags: ['fotosentez'] },
  { id: 'fn010', subject: 'fen', topic: 'canlilar', difficulty: 'orta', question: 'DNA\'nın açılımı nedir?', options: ['Deoksiribonükleik Asit', 'Diribonükleik Asit', 'Deoksiriboz Asit', 'Dinamik Nükleik Asit'], correctIndex: 0, explanation: 'Deoksiribonükleik Asit', tags: ['genetik'] },
  { id: 'fn011', subject: 'fen', topic: 'canlilar', difficulty: 'zor', question: 'Hangi vitamin güneş ışığından sentezlenir?', options: ['A', 'B', 'C', 'D'], correctIndex: 3, explanation: 'D vitamini güneşten sentezlenir.', tags: ['vitamin'] },

  // Kuvvet ve Hareket
  { id: 'fn012', subject: 'fen', topic: 'kuvvet', difficulty: 'kolay', question: 'Yerçekimi kuvveti bizi nereye çeker?', options: ['Yukarı', 'Aşağı', 'Yana', 'İleri'], correctIndex: 1, explanation: 'Yerçekimi bizi yere (aşağı) çeker.', tags: ['yerçekimi'] },
  { id: 'fn013', subject: 'fen', topic: 'kuvvet', difficulty: 'orta', question: 'Newton\'un 2. yasası hangisidir?', options: ['F = m × a', 'E = mc²', 'P = F/A', 'V = I × R'], correctIndex: 0, explanation: 'F = m × a (Kuvvet = Kütle × İvme)', tags: ['Newton'] },
  { id: 'fn014', subject: 'fen', topic: 'kuvvet', difficulty: 'zor', question: 'Sürtünme kuvveti harekete ne yapar?', options: ['Hızlandırır', 'Yavaşlatır', 'Etkilemez', 'Yön değiştirir'], correctIndex: 1, explanation: 'Sürtünme hareketi yavaşlatır.', tags: ['sürtünme'] },

  // Elektrik
  { id: 'fn015', subject: 'fen', topic: 'elektrik', difficulty: 'kolay', question: 'Elektrik akımının birimi nedir?', options: ['Volt', 'Amper', 'Ohm', 'Watt'], correctIndex: 1, explanation: 'Amper (A)', tags: ['birim'] },
  { id: 'fn016', subject: 'fen', topic: 'elektrik', difficulty: 'orta', question: 'Ohm yasası hangisidir?', options: ['V = I × R', 'F = m × a', 'E = mc²', 'P = F/A'], correctIndex: 0, explanation: 'V = I × R', tags: ['Ohm'] },
  { id: 'fn017', subject: 'fen', topic: 'elektrik', difficulty: 'zor', question: 'Seri bağlı devrede akım ne olur?', options: ['Her yerde aynı', 'Dallanır', 'Sıfırlanır', 'İkiye katlanır'], correctIndex: 0, explanation: 'Seri devrede akım her yerde aynıdır.', tags: ['devre'] },

  // Işık ve Ses
  { id: 'fn018', subject: 'fen', topic: 'isik_ses', difficulty: 'kolay', question: 'Işığın hızı yaklaşık kaç km/s?', options: ['100.000', '200.000', '300.000', '400.000'], correctIndex: 2, explanation: '~300.000 km/s', tags: ['ışık hızı'] },
  { id: 'fn019', subject: 'fen', topic: 'isik_ses', difficulty: 'orta', question: 'Ses boşlukta yayılır mı?', options: ['Evet', 'Hayır', 'Bazen', 'Sadece yüksek frekansta'], correctIndex: 1, explanation: 'Ses maddesel ortam gerektirir.', tags: ['ses'] },
  { id: 'fn020', subject: 'fen', topic: 'isik_ses', difficulty: 'zor', question: 'Gökkuşağı hangi olayla oluşur?', options: ['Yansıma', 'Kırılma ve dağılma', 'Soğurma', 'Girişim'], correctIndex: 1, explanation: 'Işığın kırılması ve dağılmasıyla oluşur.', tags: ['ışık'] },

  // Dünya ve Uzay
  { id: 'fn021', subject: 'fen', topic: 'dunya_uzay', difficulty: 'kolay', question: 'Güneş sisteminde kaç gezegen var?', options: ['7', '8', '9', '10'], correctIndex: 1, explanation: '8 gezegen', tags: ['uzay'] },
  { id: 'fn022', subject: 'fen', topic: 'dunya_uzay', difficulty: 'orta', question: 'Güneşe en yakın gezegen hangisidir?', options: ['Venüs', 'Merkür', 'Mars', 'Dünya'], correctIndex: 1, explanation: 'Merkür', tags: ['gezegenler'] },
  { id: 'fn023', subject: 'fen', topic: 'dunya_uzay', difficulty: 'zor', question: 'Dünya\'nın Güneş etrafındaki dönüşü ne kadar sürer?', options: ['30 gün', '180 gün', '365.25 gün', '400 gün'], correctIndex: 2, explanation: '365.25 gün (1 yıl)', tags: ['yörünge'] },

  // Kimyasal Değişimler
  { id: 'fn024', subject: 'fen', topic: 'kimya', difficulty: 'kolay', question: 'Paslanma ne tür değişimdir?', options: ['Fiziksel', 'Kimyasal', 'Biyolojik', 'Nükleer'], correctIndex: 1, explanation: 'Paslanma kimyasal değişimdir.', tags: ['kimyasal'] },
  { id: 'fn025', subject: 'fen', topic: 'kimya', difficulty: 'orta', question: 'Periyodik tabloda kaç element var? (2024)', options: ['112', '115', '118', '120'], correctIndex: 2, explanation: '118 element', tags: ['element'] },
  { id: 'fn026', subject: 'fen', topic: 'kimya', difficulty: 'zor', question: 'pH 7 ne anlama gelir?', options: ['Asit', 'Baz', 'Nötr', 'Tuz'], correctIndex: 2, explanation: 'pH 7 nötr çözeltidir.', tags: ['pH'] },

  // Ekosistem
  { id: 'fn027', subject: 'fen', topic: 'ekosistem', difficulty: 'kolay', question: 'Besin zincirinin başında ne bulunur?', options: ['Otçullar', 'Etçiller', 'Üreticiler (bitkiler)', 'Ayrıştırıcılar'], correctIndex: 2, explanation: 'Üreticiler (bitkiler) başta yer alır.', tags: ['besin zinciri'] },
  { id: 'fn028', subject: 'fen', topic: 'ekosistem', difficulty: 'orta', question: 'Ozon tabakası neyi engeller?', options: ['Yağmur', 'UV ışınları', 'Rüzgar', 'Soğuk'], correctIndex: 1, explanation: 'Zararlı UV ışınlarını filtreler.', tags: ['ozon'] },
  { id: 'fn029', subject: 'fen', topic: 'ekosistem', difficulty: 'zor', question: 'Sera etkisine neden olan ana gaz hangisidir?', options: ['Oksijen', 'Azot', 'Karbondioksit', 'Hidrojen'], correctIndex: 2, explanation: 'CO2 sera etkisinin ana nedenidir.', tags: ['sera'] },

  // ═══════════════ TARİH ═══════════════
  // Kurtuluş Savaşı
  { id: 'tr001', subject: 'tarih', topic: 'kurtulus_savasi', difficulty: 'kolay', question: 'Kurtuluş Savaşı ne zaman başlamıştır?', options: ['1918', '1919', '1920', '1921'], correctIndex: 1, explanation: '19 Mayıs 1919', tags: ['başlangıç'] },
  { id: 'tr002', subject: 'tarih', topic: 'kurtulus_savasi', difficulty: 'kolay', question: '19 Mayıs 1919\'da ne olmuştur?', options: ['Cumhuriyet ilan edildi', 'Atatürk Samsun\'a çıktı', 'TBMM açıldı', 'Lozan imzalandı'], correctIndex: 1, explanation: 'Atatürk Samsun\'a çıkmıştır.', tags: ['19 Mayıs'] },
  { id: 'tr003', subject: 'tarih', topic: 'kurtulus_savasi', difficulty: 'orta', question: 'Büyük Taarruz ne zaman yapılmıştır?', options: ['1920', '1921', '1922', '1923'], correctIndex: 2, explanation: '26-30 Ağustos 1922', tags: ['taarruz'] },
  { id: 'tr004', subject: 'tarih', topic: 'kurtulus_savasi', difficulty: 'orta', question: 'Sakarya Meydan Muharebesi ne zaman?', options: ['1920', '1921', '1922', '1923'], correctIndex: 1, explanation: '23 Ağustos - 13 Eylül 1921', tags: ['Sakarya'] },
  { id: 'tr005', subject: 'tarih', topic: 'kurtulus_savasi', difficulty: 'zor', question: 'I. İnönü Muharebesi kime karşı yapılmıştır?', options: ['İngilizlere', 'Fransızlara', 'Yunanlılara', 'İtalyanlara'], correctIndex: 2, explanation: 'Yunanlılara karşı (6-10 Ocak 1921)', tags: ['İnönü'] },
  { id: 'tr006', subject: 'tarih', topic: 'kurtulus_savasi', difficulty: 'zor', question: 'Başkomutanlık Meydan Muharebesi başka adıyla nedir?', options: ['Sakarya', 'Dumlupınar', 'İnönü', 'Çanakkale'], correctIndex: 1, explanation: 'Dumlupınar/Başkomutanlık Meydan Muharebesi', tags: ['Dumlupınar'] },

  // Cumhuriyetin İlanı
  { id: 'tr007', subject: 'tarih', topic: 'cumhuriyet', difficulty: 'kolay', question: 'Cumhuriyet ne zaman ilan edildi?', options: ['1920', '1921', '1922', '1923'], correctIndex: 3, explanation: '29 Ekim 1923', tags: ['cumhuriyet'] },
  { id: 'tr008', subject: 'tarih', topic: 'cumhuriyet', difficulty: 'kolay', question: 'Türkiye\'nin ilk cumhurbaşkanı kimdir?', options: ['İsmet İnönü', 'M. Kemal Atatürk', 'Celal Bayar', 'Fevzi Çakmak'], correctIndex: 1, explanation: 'Mustafa Kemal Atatürk', tags: ['cumhurbaşkanı'] },
  { id: 'tr009', subject: 'tarih', topic: 'cumhuriyet', difficulty: 'orta', question: 'İlk başbakan kimdir?', options: ['M. Kemal', 'İsmet İnönü', 'Fethi Okyar', 'Kazım Karabekir'], correctIndex: 1, explanation: 'İsmet İnönü ilk başbakandır.', tags: ['başbakan'] },
  { id: 'tr010', subject: 'tarih', topic: 'cumhuriyet', difficulty: 'zor', question: 'Ankara ne zaman başkent olmuştur?', options: ['1920', '1921', '1923', '1924'], correctIndex: 2, explanation: '13 Ekim 1923', tags: ['başkent'] },

  // Atatürk İlkeleri
  { id: 'tr011', subject: 'tarih', topic: 'ataturk_ilkeleri', difficulty: 'kolay', question: 'Hangisi Atatürk ilkelerinden biridir?', options: ['Liberalizm', 'Cumhuriyetçilik', 'Sosyalizm', 'Monarşi'], correctIndex: 1, explanation: 'Cumhuriyetçilik bir Atatürk ilkesidir.', tags: ['ilke'] },
  { id: 'tr012', subject: 'tarih', topic: 'ataturk_ilkeleri', difficulty: 'orta', question: 'Devletçilik ilkesi neyi savunur?', options: ['Özel sektör', 'Devletin ekonomiye müdahalesi', 'Serbest piyasa', 'Tarım'], correctIndex: 1, explanation: 'Devletin ekonomide aktif rol alması', tags: ['devletçilik'] },
  { id: 'tr013', subject: 'tarih', topic: 'ataturk_ilkeleri', difficulty: 'zor', question: 'Hangisi Atatürk ilkelerinden biri DEĞİLDİR?', options: ['Cumhuriyetçilik', 'Milliyetçilik', 'Liberalizm', 'Laiklik'], correctIndex: 2, explanation: 'Liberalizm Atatürk ilkeleri arasında yoktur.', tags: ['ilke'] },

  // İnkılaplar
  { id: 'tr014', subject: 'tarih', topic: 'inkilaplar', difficulty: 'kolay', question: 'Harf inkılabı hangi yıl yapılmıştır?', options: ['1926', '1927', '1928', '1929'], correctIndex: 2, explanation: '1 Kasım 1928', tags: ['harf'] },
  { id: 'tr015', subject: 'tarih', topic: 'inkilaplar', difficulty: 'orta', question: 'Şapka inkılabı hangi yıl yapılmıştır?', options: ['1924', '1925', '1926', '1927'], correctIndex: 1, explanation: '25 Kasım 1925', tags: ['şapka'] },
  { id: 'tr016', subject: 'tarih', topic: 'inkilaplar', difficulty: 'zor', question: 'Soyadı kanunu hangi yıl çıkmıştır?', options: ['1931', '1932', '1933', '1934'], correctIndex: 3, explanation: '21 Haziran 1934', tags: ['soyadı'] },

  // TBMM
  { id: 'tr017', subject: 'tarih', topic: 'tbmm', difficulty: 'kolay', question: 'TBMM ne zaman açılmıştır?', options: ['23 Nisan 1919', '23 Nisan 1920', '29 Ekim 1923', '19 Mayıs 1919'], correctIndex: 1, explanation: '23 Nisan 1920', tags: ['TBMM'] },
  { id: 'tr018', subject: 'tarih', topic: 'tbmm', difficulty: 'orta', question: 'TBMM nerede açılmıştır?', options: ['İstanbul', 'Ankara', 'İzmir', 'Samsun'], correctIndex: 1, explanation: 'Ankara\'da açılmıştır.', tags: ['TBMM'] },
  { id: 'tr019', subject: 'tarih', topic: 'tbmm', difficulty: 'zor', question: 'TBMM\'nin ilk başkanı kimdir?', options: ['İsmet İnönü', 'M. Kemal Atatürk', 'Kazım Karabekir', 'Rauf Orbay'], correctIndex: 1, explanation: 'Mustafa Kemal Atatürk', tags: ['başkan'] },

  // Antlaşmalar
  { id: 'tr020', subject: 'tarih', topic: 'antlasmalar', difficulty: 'kolay', question: 'Lozan Antlaşması hangi yıl imzalanmıştır?', options: ['1921', '1922', '1923', '1924'], correctIndex: 2, explanation: '24 Temmuz 1923', tags: ['Lozan'] },
  { id: 'tr021', subject: 'tarih', topic: 'antlasmalar', difficulty: 'orta', question: 'Mudanya Ateşkes Antlaşması hangi yıl imzalanmıştır?', options: ['1920', '1921', '1922', '1923'], correctIndex: 2, explanation: '11 Ekim 1922', tags: ['Mudanya'] },
  { id: 'tr022', subject: 'tarih', topic: 'antlasmalar', difficulty: 'zor', question: 'Sevr Antlaşması hangi devletler arasında imzalanmıştır?', options: ['TBMM-İtilaf', 'Osmanlı-İtilaf', 'TBMM-Yunanistan', 'Osmanlı-Almanya'], correctIndex: 1, explanation: 'Osmanlı Devleti ile İtilaf Devletleri arasında', tags: ['Sevr'] },

  // Milli Mücadele
  { id: 'tr023', subject: 'tarih', topic: 'milli_mucadele', difficulty: 'kolay', question: 'Atatürk nerede doğmuştur?', options: ['İstanbul', 'Ankara', 'Selanik', 'İzmir'], correctIndex: 2, explanation: 'Selanik\'te doğmuştur.', tags: ['Atatürk'] },
  { id: 'tr024', subject: 'tarih', topic: 'milli_mucadele', difficulty: 'orta', question: 'Amasya Genelgesi ne zaman yayımlanmıştır?', options: ['Mayıs 1919', 'Haziran 1919', 'Temmuz 1919', 'Ağustos 1919'], correctIndex: 1, explanation: '22 Haziran 1919', tags: ['genelge'] },
  { id: 'tr025', subject: 'tarih', topic: 'milli_mucadele', difficulty: 'zor', question: 'Erzurum Kongresi\'nin önemi nedir?', options: ['Ateşkes ilan edildi', 'Milli sınırlar belirlendi', 'Cumhuriyet ilan edildi', 'Halifelik kaldırıldı'], correctIndex: 1, explanation: 'Milli sınırlar ve milli irade vurgulanmıştır.', tags: ['kongre'] },

  // Çok Partili Hayat
  { id: 'tr026', subject: 'tarih', topic: 'cok_partili', difficulty: 'kolay', question: 'Türkiye\'nin ilk siyasi partisi hangisidir?', options: ['CHP', 'DP', 'AP', 'MHP'], correctIndex: 0, explanation: 'Cumhuriyet Halk Partisi (CHP)', tags: ['parti'] },
  { id: 'tr027', subject: 'tarih', topic: 'cok_partili', difficulty: 'orta', question: 'Türkiye çok partili hayata ne zaman geçmiştir?', options: ['1923', '1930', '1945', '1950'], correctIndex: 2, explanation: '1945\'te çok partili hayata geçildi.', tags: ['çok partili'] },
  { id: 'tr028', subject: 'tarih', topic: 'cok_partili', difficulty: 'zor', question: 'Terakkiperver Cumhuriyet Fırkası hangi yıl kurulmuştur?', options: ['1923', '1924', '1925', '1926'], correctIndex: 1, explanation: '17 Kasım 1924', tags: ['parti'] },

  // ═══════════════ İNGİLİZCE ═══════════════
  // Greetings
  { id: 'en001', subject: 'ingilizce', topic: 'greetings', difficulty: 'kolay', question: '"Hello" ne demektir?', options: ['Güle güle', 'Merhaba', 'Teşekkürler', 'Lütfen'], correctIndex: 1, explanation: 'Hello = Merhaba', tags: ['selamlama'] },
  { id: 'en002', subject: 'ingilizce', topic: 'greetings', difficulty: 'kolay', question: '"Good morning" ne demektir?', options: ['İyi akşamlar', 'İyi geceler', 'Günaydın', 'İyi günler'], correctIndex: 2, explanation: 'Good morning = Günaydın', tags: ['selamlama'] },
  { id: 'en003', subject: 'ingilizce', topic: 'greetings', difficulty: 'orta', question: '"How are you?" sorusuna uygun cevap hangisidir?', options: ['I am 10', 'I am fine', 'I am Turkey', 'I am student'], correctIndex: 1, explanation: 'I am fine, thank you.', tags: ['diyalog'] },
  { id: 'en004', subject: 'ingilizce', topic: 'greetings', difficulty: 'zor', question: '"Nice to meet you" ne demektir?', options: ['Görüşürüz', 'Tanıştığıma memnun oldum', 'Nasılsın', 'Hoşça kal'], correctIndex: 1, explanation: 'Tanıştığıma memnun oldum', tags: ['tanışma'] },

  // Present Tense
  { id: 'en005', subject: 'ingilizce', topic: 'present_tense', difficulty: 'kolay', question: '"I ___ a student." Boşluğa ne gelir?', options: ['is', 'am', 'are', 'be'], correctIndex: 1, explanation: 'I am a student.', tags: ['to be'] },
  { id: 'en006', subject: 'ingilizce', topic: 'present_tense', difficulty: 'kolay', question: '"They ___ happy." Boşluğa ne gelir?', options: ['is', 'am', 'are', 'was'], correctIndex: 2, explanation: 'They are happy.', tags: ['to be'] },
  { id: 'en007', subject: 'ingilizce', topic: 'present_tense', difficulty: 'orta', question: '"She ___ to school every day." Boşluğa ne gelir?', options: ['go', 'goes', 'going', 'gone'], correctIndex: 1, explanation: '3. tekil şahıs: goes', tags: ['simple present'] },
  { id: 'en008', subject: 'ingilizce', topic: 'present_tense', difficulty: 'zor', question: '"He doesn\'t ___ coffee." Boşluğa ne gelir?', options: ['likes', 'like', 'liking', 'liked'], correctIndex: 1, explanation: 'doesn\'t + yalın fiil', tags: ['olumsuz'] },

  // Past Tense
  { id: 'en009', subject: 'ingilizce', topic: 'past_tense', difficulty: 'kolay', question: '"I ___ at home yesterday." Boşluğa ne gelir?', options: ['am', 'is', 'was', 'are'], correctIndex: 2, explanation: 'I was at home yesterday.', tags: ['past to be'] },
  { id: 'en010', subject: 'ingilizce', topic: 'past_tense', difficulty: 'orta', question: '"She ___ a book last night." Boşluğa ne gelir?', options: ['read', 'reads', 'reading', 'readed'], correctIndex: 0, explanation: 'read (past tense)', tags: ['düzensiz fiil'] },
  { id: 'en011', subject: 'ingilizce', topic: 'past_tense', difficulty: 'zor', question: '"They ___ to Paris in 2020." Boşluğa ne gelir?', options: ['go', 'goes', 'went', 'gone'], correctIndex: 2, explanation: 'go → went (past tense)', tags: ['düzensiz fiil'] },

  // Vocabulary
  { id: 'en012', subject: 'ingilizce', topic: 'vocabulary', difficulty: 'kolay', question: '"Cat" ne demektir?', options: ['Köpek', 'Kuş', 'Kedi', 'Balık'], correctIndex: 2, explanation: 'Cat = Kedi', tags: ['hayvanlar'] },
  { id: 'en013', subject: 'ingilizce', topic: 'vocabulary', difficulty: 'kolay', question: '"Monday" hangi gündür?', options: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba'], correctIndex: 1, explanation: 'Monday = Pazartesi', tags: ['günler'] },
  { id: 'en014', subject: 'ingilizce', topic: 'vocabulary', difficulty: 'orta', question: '"Beautiful" ne demektir?', options: ['Çirkin', 'Güzel', 'Hızlı', 'Büyük'], correctIndex: 1, explanation: 'Beautiful = Güzel', tags: ['sıfatlar'] },
  { id: 'en015', subject: 'ingilizce', topic: 'vocabulary', difficulty: 'zor', question: '"Exhausted" ne demektir?', options: ['Heyecanlı', 'Bitkin', 'Mutlu', 'Kızgın'], correctIndex: 1, explanation: 'Exhausted = Bitkin, çok yorgun', tags: ['ileri kelime'] },

  // Prepositions
  { id: 'en016', subject: 'ingilizce', topic: 'prepositions', difficulty: 'kolay', question: '"The book is ___ the table." Boşluğa ne gelir?', options: ['in', 'on', 'at', 'to'], correctIndex: 1, explanation: 'on the table (masanın üstünde)', tags: ['yer'] },
  { id: 'en017', subject: 'ingilizce', topic: 'prepositions', difficulty: 'orta', question: '"I arrive ___ Monday." Boşluğa ne gelir?', options: ['in', 'on', 'at', 'to'], correctIndex: 1, explanation: 'Günler için "on" kullanılır.', tags: ['zaman'] },
  { id: 'en018', subject: 'ingilizce', topic: 'prepositions', difficulty: 'zor', question: '"She has been studying ___ two hours." Boşluğa ne gelir?', options: ['since', 'for', 'during', 'while'], correctIndex: 1, explanation: 'Süre için "for" kullanılır.', tags: ['zaman'] },

  // Comparatives
  { id: 'en019', subject: 'ingilizce', topic: 'comparatives', difficulty: 'kolay', question: '"Big" kelimesinin karşılaştırma hali nedir?', options: ['Biger', 'Bigger', 'More big', 'Most big'], correctIndex: 1, explanation: 'big → bigger', tags: ['karşılaştırma'] },
  { id: 'en020', subject: 'ingilizce', topic: 'comparatives', difficulty: 'orta', question: '"Beautiful" kelimesinin karşılaştırma hali?', options: ['Beautifuler', 'More beautiful', 'Most beautiful', 'Beautifuller'], correctIndex: 1, explanation: 'Uzun sıfatlarda "more" kullanılır.', tags: ['karşılaştırma'] },
  { id: 'en021', subject: 'ingilizce', topic: 'comparatives', difficulty: 'zor', question: '"Good" kelimesinin üstünlük hali nedir?', options: ['Gooder', 'Better', 'Best', 'Most good'], correctIndex: 2, explanation: 'good → better → best', tags: ['düzensiz'] },

  // Reading
  { id: 'en022', subject: 'ingilizce', topic: 'reading', difficulty: 'kolay', question: '"I like apples." Bu cümlede ne sevilir?', options: ['Portakal', 'Elma', 'Muz', 'Üzüm'], correctIndex: 1, explanation: 'Apples = Elmalar', tags: ['anlama'] },
  { id: 'en023', subject: 'ingilizce', topic: 'reading', difficulty: 'orta', question: '"Tom is taller than Jerry." Kim daha uzun?', options: ['Jerry', 'Tom', 'İkisi eşit', 'Belirtilmemiş'], correctIndex: 1, explanation: 'Tom is taller (daha uzun)', tags: ['karşılaştırma'] },

  // Modal Verbs
  { id: 'en024', subject: 'ingilizce', topic: 'modals', difficulty: 'kolay', question: '"Can" ne anlama gelir?', options: ['Zorunda', 'Yapabilir', 'Yapmalı', 'Yapacak'], correctIndex: 1, explanation: 'Can = yapabilir (yetenek)', tags: ['modal'] },
  { id: 'en025', subject: 'ingilizce', topic: 'modals', difficulty: 'orta', question: '"You ___ study for the exam." (zorunluluk)', options: ['can', 'may', 'must', 'could'], correctIndex: 2, explanation: 'Must = zorunda (zorunluluk)', tags: ['zorunluluk'] },
  { id: 'en026', subject: 'ingilizce', topic: 'modals', difficulty: 'zor', question: '"If I were rich, I ___ travel." Boşluğa ne gelir?', options: ['will', 'can', 'would', 'shall'], correctIndex: 2, explanation: 'Second conditional: would', tags: ['conditional'] },

  // ═══════════════ DİN KÜLTÜRÜ ═══════════════
  // İbadet
  { id: 'dn001', subject: 'din', topic: 'ibadet', difficulty: 'kolay', question: 'Günde kaç vakit namaz kılınır?', options: ['3', '4', '5', '6'], correctIndex: 2, explanation: '5 vakit namaz', tags: ['namaz'] },
  { id: 'dn002', subject: 'din', topic: 'ibadet', difficulty: 'kolay', question: 'İslam\'ın beş şartından biri hangisidir?', options: ['Oruç', 'Spor', 'Okumak', 'Uyumak'], correctIndex: 0, explanation: 'Oruç tutmak', tags: ['şart'] },
  { id: 'dn003', subject: 'din', topic: 'ibadet', difficulty: 'orta', question: 'Ramazan ayında hangi ibadet yapılır?', options: ['Hac', 'Oruç', 'Kurban', 'Zekat'], correctIndex: 1, explanation: 'Ramazan\'da oruç tutulur.', tags: ['oruç'] },
  { id: 'dn004', subject: 'din', topic: 'ibadet', difficulty: 'orta', question: 'Hac ibadeti nerede yapılır?', options: ['Medine', 'Mekke', 'Kudüs', 'İstanbul'], correctIndex: 1, explanation: 'Mekke\'de yapılır.', tags: ['hac'] },
  { id: 'dn005', subject: 'din', topic: 'ibadet', difficulty: 'zor', question: 'Namazın farzlarından olmayan hangisidir?', options: ['Kıyam', 'Rükû', 'Kunut', 'Secde'], correctIndex: 2, explanation: 'Kunut namazın vaciblerinden/sünnetlerindendir, farz değil.', tags: ['namaz'] },

  // Kur'an
  { id: 'dn006', subject: 'din', topic: 'kuran', difficulty: 'kolay', question: 'Kur\'an-ı Kerim kaç sureden oluşur?', options: ['100', '114', '120', '99'], correctIndex: 1, explanation: '114 sure', tags: ['sure'] },
  { id: 'dn007', subject: 'din', topic: 'kuran', difficulty: 'orta', question: 'Kur\'an\'ın ilk inen suresi hangisidir?', options: ['Fatiha', 'Bakara', 'Alak', 'İhlas'], correctIndex: 2, explanation: 'Alak suresi ilk inendir.', tags: ['vahiy'] },
  { id: 'dn008', subject: 'din', topic: 'kuran', difficulty: 'zor', question: 'En uzun sure hangisidir?', options: ['Yasin', 'Bakara', 'Nisa', 'Ali İmran'], correctIndex: 1, explanation: 'Bakara suresi (286 ayet)', tags: ['sure'] },

  // Peygamberler
  { id: 'dn009', subject: 'din', topic: 'peygamberler', difficulty: 'kolay', question: 'Hz. Muhammed nerede doğmuştur?', options: ['Medine', 'Mekke', 'Kudüs', 'Taif'], correctIndex: 1, explanation: 'Mekke\'de doğmuştur.', tags: ['Hz. Muhammed'] },
  { id: 'dn010', subject: 'din', topic: 'peygamberler', difficulty: 'orta', question: 'Son peygamber kimdir?', options: ['Hz. İsa', 'Hz. Musa', 'Hz. Muhammed', 'Hz. İbrahim'], correctIndex: 2, explanation: 'Hz. Muhammed (s.a.v.) son peygamberdir.', tags: ['son peygamber'] },
  { id: 'dn011', subject: 'din', topic: 'peygamberler', difficulty: 'zor', question: 'Kur\'an\'da adı geçen peygamber sayısı kaçtır?', options: ['20', '25', '28', '30'], correctIndex: 1, explanation: '25 peygamber ismi geçer.', tags: ['peygamber'] },

  // Ahlak
  { id: 'dn012', subject: 'din', topic: 'ahlak', difficulty: 'kolay', question: 'Hangisi güzel ahlak örneklerindendir?', options: ['Yalan söylemek', 'Dürüst olmak', 'Hile yapmak', 'Kibirli olmak'], correctIndex: 1, explanation: 'Dürüstlük güzel ahlaktır.', tags: ['dürüstlük'] },
  { id: 'dn013', subject: 'din', topic: 'ahlak', difficulty: 'orta', question: 'Hz. Muhammed\'in en bilinen sıfatı hangisidir?', options: ['El-Emin (Güvenilir)', 'El-Aziz', 'El-Kerim', 'El-Hakim'], correctIndex: 0, explanation: 'El-Emin = Güvenilir', tags: ['sıfat'] },
  { id: 'dn014', subject: 'din', topic: 'ahlak', difficulty: 'zor', question: '"Haya imandan bir parçadır" sözü neyi vurgular?', options: ['Bilgi', 'Utanma duygusu', 'Cesaret', 'Zenginlik'], correctIndex: 1, explanation: 'Haya (utanma duygusu) imanın parçasıdır.', tags: ['haya'] },

  // İslam Tarihi
  { id: 'dn015', subject: 'din', topic: 'islam_tarihi', difficulty: 'kolay', question: 'Hicret hangi yıl gerçekleşmiştir?', options: ['610', '620', '622', '632'], correctIndex: 2, explanation: '622 yılında', tags: ['hicret'] },
  { id: 'dn016', subject: 'din', topic: 'islam_tarihi', difficulty: 'orta', question: 'İlk vahiy nerede gelmiştir?', options: ['Kâbe', 'Hira Mağarası', 'Medine', 'Taif'], correctIndex: 1, explanation: 'Hira Mağarası\'nda', tags: ['vahiy'] },
  { id: 'dn017', subject: 'din', topic: 'islam_tarihi', difficulty: 'zor', question: 'Bedir Savaşı hangi yıl yapılmıştır?', options: ['622', '624', '625', '627'], correctIndex: 1, explanation: '624 yılında', tags: ['savaş'] },

  // İnanç
  { id: 'dn018', subject: 'din', topic: 'inanc', difficulty: 'kolay', question: 'İslam\'da imanın şartı kaçtır?', options: ['4', '5', '6', '7'], correctIndex: 2, explanation: '6 iman şartı', tags: ['iman'] },
  { id: 'dn019', subject: 'din', topic: 'inanc', difficulty: 'orta', question: 'Hangisi imanın şartlarından biridir?', options: ['Namaz', 'Oruç', 'Ahirete iman', 'Zekat'], correctIndex: 2, explanation: 'Ahirete iman, iman şartlarındandır.', tags: ['iman şartı'] },
  { id: 'dn020', subject: 'din', topic: 'inanc', difficulty: 'zor', question: '4 büyük kitaptan biri olmayan hangisidir?', options: ['Tevrat', 'Zebur', 'Suhuf', 'İncil'], correctIndex: 2, explanation: 'Suhuf kitap değil, sayfalardır.', tags: ['kitap'] },

  // Hadis
  { id: 'dn021', subject: 'din', topic: 'hadis', difficulty: 'kolay', question: 'Hadis ne demektir?', options: ['Kur\'an ayeti', 'Hz. Muhammed\'in sözleri', 'Dua', 'Sure'], correctIndex: 1, explanation: 'Peygamberimizin söz ve davranışları', tags: ['tanım'] },
  { id: 'dn022', subject: 'din', topic: 'hadis', difficulty: 'orta', question: '"Sahih-i Buhari" nedir?', options: ['Tefsir kitabı', 'Hadis kitabı', 'Fıkıh kitabı', 'Tarih kitabı'], correctIndex: 1, explanation: 'En güvenilir hadis kitaplarından biridir.', tags: ['kitap'] },
  { id: 'dn023', subject: 'din', topic: 'hadis', difficulty: 'zor', question: '"Kütüb-i Sitte" ne demektir?', options: ['4 kitap', '5 kitap', '6 kitap', '7 kitap'], correctIndex: 2, explanation: 'Altı güvenilir hadis kitabı', tags: ['koleksiyon'] },

  // Değerler Eğitimi
  { id: 'dn024', subject: 'din', topic: 'degerler', difficulty: 'kolay', question: 'Hangisi temel değerlerden biridir?', options: ['Bencillik', 'Saygı', 'Kibir', 'Hırs'], correctIndex: 1, explanation: 'Saygı temel bir değerdir.', tags: ['saygı'] },
  { id: 'dn025', subject: 'din', topic: 'degerler', difficulty: 'orta', question: 'Hoşgörü ne demektir?', options: ['Her şeyi kabul etmek', 'Farklılıklara saygı göstermek', 'Sessiz kalmak', 'Karşı çıkmamak'], correctIndex: 1, explanation: 'Farklılıklara saygı göstermektir.', tags: ['hoşgörü'] },
  { id: 'dn026', subject: 'din', topic: 'degerler', difficulty: 'zor', question: '"Komşusu açken tok yatan bizden değildir" hadisi neyi vurgular?', options: ['Yemek yemeyi', 'Paylaşmayı', 'Uyumayı', 'Komşuluğu'], correctIndex: 1, explanation: 'Paylaşma ve dayanışma', tags: ['paylaşma'] },
];

export function getQuestionsBySubject(subject: Subject): Question[] {
  return questions.filter(q => q.subject === subject);
}

export function getQuestionsByTopic(subject: Subject, topic: string): Question[] {
  return questions.filter(q => q.subject === subject && q.topic === topic);
}

export function getQuestionsByDifficulty(subject: Subject, topic: string, difficulty: string): Question[] {
  return questions.filter(q => q.subject === subject && q.topic === topic && q.difficulty === difficulty);
}

export function getRandomQuestions(subject: Subject, count: number = 10, topic?: string, difficulty?: string): Question[] {
  let pool = questions.filter(q => q.subject === subject);
  if (topic) pool = pool.filter(q => q.topic === topic);
  if (difficulty) pool = pool.filter(q => q.difficulty === difficulty);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getTopicsForSubject(subject: Subject): TopicInfo[] {
  return SUBJECTS.find(s => s.id === subject)?.topics || [];
}
