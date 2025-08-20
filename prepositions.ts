export const RU_PREPOSITIONS = new Set([
  "в", "на", "с", "к", "о", "об", "от", "до", "за", "для", "по", "при", "через", "между", "над", "под", "про", "без", "у", "из", "около", "вне", "внутри", "вместо", "сверх", "впереди", "вслед", "по-за", "в течение","не", "ни",
  "и", "а", "но", "да", "или", "либо", "чтобы", "что", "как", "когда", "если", "поскольку", "так как", "хотя", "зато", "ли", "ведь", "ибо", "пусть", "даже", "только", "однако", "также", "несмотря", "пока", "потому что", "чем", "чтобы", "лишь", "ибо"
]);
export const EN_PREPOSITIONS = new Set([
  "a","about","above","across","after","against","along","although","amid","among","an","and","around","as","at","because","before","behind","below","beneath","beside","besides","between","beyond","but","by","concerning","despite","down","during","except","for","from","if","in","inside","into","like","near","nor","of","off","on","onto","or","out","outside","over","past","per","plus","regarding","round","since","so","than","that","though","through","throughout","till","to","toward","towards","under","underneath","until","up","upon","via","with","within","without","yet"
]);
export const FR_PREPOSITIONS = new Set([
  "à","afin","ainsi","après","au","aucun","auprès","aussi","autour","avec","avant","car","ce","ces","chez","comme","dans","de","dedans","depuis","derrière","des","devant","durant","elle","en","entre","et","hors","il","jusqu","là","la","le","les","leur","lorsque","mais","malgré","ni","non","nous","ou","où","par","parce","parmi","pendant","pour","près","puisque","quand","que","quel","quelle","quels","qui","sans","sauf","selon","si","soit","sous","sur","tandis","tel","telle","tels","toutes","vers","voici","voilà","vous"
]);
export const DE_PREPOSITIONS = new Set([
  "aber","als","am","an","auf","aus","bei","beim","bis","dank","dass","dem","den","der","des","die","durch","ein","eine","einem","einen","einer","eines","entgegen","entsprechend","für","gegen","gegenüber","gemäß","hinter","im","in","innerhalb","ins","ist","mit","nach","neben","nicht","noch","ob","ohne","seit","seines","sich","sie","so","soweit","sowie","über","um","und","unter","vom","von","vor","während","wegen","weil","wenn","wie","wider","zu","zum","zur","zwischen"
]);
export const CZ_PREPOSITIONS: Set<string> = new Set([
    "a","aby","ale","anebo","ani","avšak","bez","během","blízko","do","i","jak","jako","jen","jestli","jestliže","k","když","ke","kolem","kvůli","mezi","na","nad","namísto","naproti","nebo","nejen","o","ob","od","okolí","okolo","oproti","po","pod","pokud","pomocí","pouze","pro","protože","před","při","s","se","skrz","snad","spolu","u","v","ve","vedle","včetně","versus","vzhledem","z","za","zatímco","ze","že"
]);
export const SP_PREPOSITIONS: Set<string> = new Set([
    "a","al","algo","alrededor","ante","antes","aunque","bajo","bien","cabe","cada","como","con","contra","cual","cuando","de","del","desde","donde","durante","el","ella","ellas","ellos","en","entre","era","eres","es","esa","ese","eso","esta","este","esto","hasta","hacia","incluso","la","las","lo","los","mas","mediante","mi","mientras","muy","ni","no","nos","nuestra","nuestro","o","os","para","pero","por","porque","que","quien","se","según","ser","sin","sobre","so","su","sus","tal","también","tan","tanto","te","ti","todavía","tras","tu","tus","un","una","uno","vosotros","vuestra","vuestro","ya","yo"
]);
export const IT_PREPOSITIONS: Set<string> = new Set([
    "a","ad","affinché","alcuno","all","alla","alle","allo","anche","anzi","avanti","benché","che","chi","ci","col","come","con","contro","cui","da","dal","dalla","dalle","dallo","de","degli","dei","del","della","delle","dello","dentro","di","dopo","dove","e","ed","entro","essa","esse","esso","fino","fra","fuori","giacché","gli","i","il","in","là","la","le","lei","li","lo","loro","ma","mentre","mi","ne","nei","nel","nella","nelle","nello","non","noi","o","ogni","oltre","oppure","per","perché","più","poiché","poi","presso","quale","quando","quanti","quattro","quel","quella","quelle","quelli","quello","questo","qui","se","sebbene","senza","sia","siamo","siete","sopra","sotto","su","sul","sulla","sulle","sullo","tra","un","una","uno","voi"
]);

export const PREPOSITION_SETS: Record<string, Set<string>> = {
    en: EN_PREPOSITIONS,
    ru: RU_PREPOSITIONS,
    fr: FR_PREPOSITIONS,
    de: DE_PREPOSITIONS,
    cz: CZ_PREPOSITIONS,
    sp: SP_PREPOSITIONS,
    it: IT_PREPOSITIONS
};