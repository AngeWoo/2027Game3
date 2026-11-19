// 全球真如苑地點資料庫（整理自 Padlet「世界的真如苑」地圖，2026-11-20）
// 只收真如苑相關地點；Padlet 上的佛教聖地與南極教堂不收。
//   name      完整名稱：顯示在格子彈窗上方
//   short     短名：顯示在棋盤格子上（越短，全盤字級越大）
//   country / flag / continent：國家、國旗、洲別（每局各洲至少抽一格）
//   kind      hq 日本本部 / temple 精舍 / mission 佈教所
//   required  true = 每局一定出現在棋盤上
//   enabled   false = 先不放進遊戲（資料保留）
// 要增刪地點，直接改這個檔案即可，不用動 script.js。
const TEMPLE_LIST = [
  // ── 日本 ──
  { name: "真如苑總本部（聖地親苑）、真澄寺", short: "真如苑總本部、真澄寺", country: "日本", flag: "🇯🇵", continent: "亞洲", kind: "hq", required: true },
  { name: "真如苑應現院（Ogen Center）", short: "應現院", country: "日本", flag: "🇯🇵", continent: "亞洲", kind: "hq", required: true },
  { name: "真如苑友心院（Yushin Center）", short: "友心院", country: "日本", flag: "🇯🇵", continent: "亞洲", kind: "hq" },
  { name: "真如苑悠音精舍（大阪高槻）", short: "悠音精舍", country: "日本", flag: "🇯🇵", continent: "亞洲", kind: "hq" },
  { name: "慧燈院（東京立川）", short: "慧燈院", country: "日本", flag: "🇯🇵", continent: "亞洲", kind: "hq" },

  // ── 亞洲 ──
  { name: "真如苑臺灣本部（臺北）", short: "臺灣本部", country: "臺灣", flag: "🇹🇼", continent: "亞洲", kind: "temple" },
  { name: "真如苑臺中佈教所", short: "臺中佈教所", country: "臺灣", flag: "🇹🇼", continent: "亞洲", kind: "mission" },
  { name: "真如苑高雄佈教所", short: "高雄佈教所", country: "臺灣", flag: "🇹🇼", continent: "亞洲", kind: "mission" },
  { name: "真如苑中壢佈教所", short: "中壢佈教所", country: "臺灣", flag: "🇹🇼", continent: "亞洲", kind: "mission" },
  { name: "真如苑香港精舍（銅鑼灣）", short: "香港精舍", country: "香港", flag: "🇭🇰", continent: "亞洲", kind: "temple" },
  { name: "真如苑韓國首爾精舍", short: "首爾精舍", country: "韓國", flag: "🇰🇷", continent: "亞洲", kind: "temple" },
  { name: "真如苑韓國釜山精舍", short: "釜山精舍", country: "韓國", flag: "🇰🇷", continent: "亞洲", kind: "temple" },
  { name: "真如苑濟州佈教所（韓國）", short: "濟州佈教所", country: "韓國", flag: "🇰🇷", continent: "亞洲", kind: "mission" },
  { name: "真如苑昌原佈教所（韓國）", short: "昌原佈教所", country: "韓國", flag: "🇰🇷", continent: "亞洲", kind: "mission" },
  { name: "真如苑泰國（曼谷）", short: "真如苑泰國", country: "泰國", flag: "🇹🇭", continent: "亞洲", kind: "temple" },
  { name: "真如苑新加坡精舍", short: "新加坡精舍", country: "新加坡", flag: "🇸🇬", continent: "亞洲", kind: "temple" },
  { name: "真如苑吉隆坡佈教所（馬來西亞）", short: "吉隆坡佈教所", country: "馬來西亞", flag: "🇲🇾", continent: "亞洲", kind: "mission" },
  { name: "真如苑斯里蘭卡精舍（科特）", short: "斯里蘭卡精舍", country: "斯里蘭卡", flag: "🇱🇰", continent: "亞洲", kind: "temple" },

  // ── 大洋洲 ──
  { name: "真如苑澳洲精舍（雪梨）", short: "澳洲精舍", country: "澳洲", flag: "🇦🇺", continent: "大洋洲", kind: "temple" },
  // 夏威夷在地理上屬於大洋洲（政治上屬美國）
  { name: "布哇真如苑（夏威夷米利拉尼）", short: "布哇真如苑", country: "美國夏威夷", flag: "🇺🇸", continent: "大洋洲", kind: "temple" },
  { name: "真如苑夏威夷精舍（檀香山）", short: "夏威夷精舍", country: "美國夏威夷", flag: "🇺🇸", continent: "大洋洲", kind: "temple" },
  { name: "真如苑歐胡島佈教所（美國夏威夷）", short: "歐胡島佈教所", country: "美國夏威夷", flag: "🇺🇸", continent: "大洋洲", kind: "mission" },
  { name: "真如苑科納佈教所（美國夏威夷）", short: "科納佈教所", country: "美國夏威夷", flag: "🇺🇸", continent: "大洋洲", kind: "mission" },
  { name: "真如苑茂宜島佈教所（美國夏威夷）", short: "茂宜島佈教所", country: "美國夏威夷", flag: "🇺🇸", continent: "大洋洲", kind: "mission" },

  // ── 北美洲 ──
  { name: "真如苑美國本部（加州紅木城）", short: "美國本部", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "temple" },
  { name: "真如苑舊金山瑪莉娜精舍", short: "瑪莉娜精舍", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "temple" },
  { name: "真如苑洛杉磯精舍", short: "洛杉磯精舍", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "temple" },
  { name: "真如苑芝加哥精舍", short: "芝加哥精舍", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "temple" },
  { name: "真如苑紐約精舍", short: "紐約精舍", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "temple" },
  { name: "真如中心（紐約）", short: "真如中心NY", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "temple" },
  { name: "真如苑西雅圖精舍", short: "西雅圖精舍", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "temple" },
  { name: "真如苑內華達佈教所（美國）", short: "內華達佈教所", country: "美國", flag: "🇺🇸", continent: "北美洲", kind: "mission" },
  { name: "真如苑溫哥華佈教所（加拿大）", short: "溫哥華佈教所", country: "加拿大", flag: "🇨🇦", continent: "北美洲", kind: "mission" },
  { name: "真如苑墨西哥佈教所", short: "墨西哥佈教所", country: "墨西哥", flag: "🇲🇽", continent: "北美洲", kind: "mission" },

  // ── 南美洲 ──
  { name: "真如苑巴西精舍（聖保羅）", short: "巴西精舍", country: "巴西", flag: "🇧🇷", continent: "南美洲", kind: "temple" },
  { name: "真如苑巴西貝倫佈教所", short: "貝倫佈教所", country: "巴西", flag: "🇧🇷", continent: "南美洲", kind: "mission" },
  { name: "真如苑秘魯佈教所（利馬）", short: "秘魯佈教所", country: "秘魯", flag: "🇵🇪", continent: "南美洲", kind: "mission" },

  // ── 歐洲 ──
  { name: "真如苑歐洲本部（法國巴黎）", short: "歐洲本部", country: "法國", flag: "🇫🇷", continent: "歐洲", kind: "temple" },
  { name: "真如苑英國精舍（倫敦）", short: "英國精舍", country: "英國", flag: "🇬🇧", continent: "歐洲", kind: "temple" },
  { name: "真如苑德國漢堡精舍", short: "漢堡精舍", country: "德國", flag: "🇩🇪", continent: "歐洲", kind: "temple" },
  { name: "真如苑德國慕尼黑精舍", short: "慕尼黑精舍", country: "德國", flag: "🇩🇪", continent: "歐洲", kind: "temple" },
  { name: "真如苑德國法蘭克福佈教所", short: "法蘭克福佈教所", country: "德國", flag: "🇩🇪", continent: "歐洲", kind: "mission" },
  { name: "真如苑德國柏林佈教所", short: "柏林佈教所", country: "德國", flag: "🇩🇪", continent: "歐洲", kind: "mission" },
  { name: "真如苑阿姆斯特丹佈教所（荷蘭）", short: "阿姆斯特丹佈教所", country: "荷蘭", flag: "🇳🇱", continent: "歐洲", kind: "mission" },
  { name: "真如苑比利時精舍（布魯塞爾）", short: "比利時精舍", country: "比利時", flag: "🇧🇪", continent: "歐洲", kind: "temple" },
  { name: "真如苑基輔佈教所（烏克蘭）", short: "基輔佈教所", country: "烏克蘭", flag: "🇺🇦", continent: "歐洲", kind: "mission" },
  { name: "真如苑義大利精舍（米蘭）", short: "米蘭精舍", country: "義大利", flag: "🇮🇹", continent: "歐洲", kind: "temple" },
  { name: "真如苑羅馬佈教所（義大利）", short: "羅馬佈教所", country: "義大利", flag: "🇮🇹", continent: "歐洲", kind: "mission" },
  { name: "真如苑聖坦德佈教所（西班牙）", short: "聖坦德佈教所", country: "西班牙", flag: "🇪🇸", continent: "歐洲", kind: "mission" },
  { name: "真如苑斯德哥爾摩佈教所（瑞典）", short: "斯德哥爾摩佈教所", country: "瑞典", flag: "🇸🇪", continent: "歐洲", kind: "mission" },

  // ── 非洲 ──
  { name: "真如苑肯亞佈教所（奈洛比）", short: "肯亞佈教所", country: "肯亞", flag: "🇰🇪", continent: "非洲", kind: "mission" },
];
