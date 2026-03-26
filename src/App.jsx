import { useState } from "react";

const TRENDS = [
  { name: "상하이 버터떡", brand: null, category: "디저트", desc: "2026년 현재 가장 핫한 디저트. 찹쌀떡 반죽을 버터에 구워 겉은 바삭, 속은 쫀득한 이중 식감이 핵심.", tags: ["상하이버터떡", "버터떡", "쫀득바삭"], hot: "급상승", source: "이투데이", likes: "틱톡 500만+" },
  { name: "말차 라떼 & 디저트", brand: "스타벅스/투썸/성심당", category: "음료", desc: "인스타 해시태그 1000만건, 틱톡 340만건. 스타벅스 제주말차라떼 30% 증가, 투썸 말차아박 130만개 판매.", tags: ["말차코어", "말차라떼", "말차디저트"], hot: "인기", source: "한국경제", likes: "인스타 1000만 태그" },
  { name: "요아정", brand: "요아정", category: "디저트", desc: "10여종 과일+30여종 토핑 커스텀 요거트 아이스크림. 초코쉘, 벌집꿀 등 SNS 인증샷 폭발.", tags: ["요아정", "요거트아이스크림", "커스텀"], hot: "인기", source: "외식트렌드", likes: "전국 매장 확대" },
  { name: "원바이트 케이크", brand: "다수 베이커리", category: "케이크", desc: "한입 크기 미니 케이크가 인스타 점령. 건강+가성비. 글로벌 검색량 400% 급증.", tags: ["원바이트케이크", "미니케이크", "인스타케이크"], hot: "급상승", source: "Taste Tomorrow", likes: "인스타 피드 도배" },
  { name: "아샷추", brand: "빽다방 외 다수", category: "음료", desc: "아이스티+에스프레소 조합. 온라인 레시피 유행에서 정식 메뉴화. 아펄추, 아망추 등 변형도 인기.", tags: ["아샷추", "아펄추", "카페커스텀"], hot: "인기", source: "카페트렌드", likes: "대부분 카페 메뉴화" },
  { name: "크림 단팥 소금빵", brand: "다수 베이커리", category: "음식", desc: "소금빵 버터풍미+단팥+생크림 삼각조합. 짭단부 밸런스가 MZ 취향과 일치.", tags: ["크림단팥소금빵", "소금빵", "짭단부"], hot: "급상승", source: "이코노미스트", likes: "SNS 화제 1위" },
  { name: "흑당 두부 밀크티", brand: "공차x풀무원", category: "음료", desc: "대만 또우화를 공차 스타일로 재해석. 흑당+미니펄+두부푸딩 조합.", tags: ["공차", "흑당두부", "또우화"], hot: "인기", source: "글로벌에픽", likes: "신메뉴 1위" },
  { name: "프로틴 커피", brand: "스타벅스/피츠커피", category: "커피", desc: "단백질+커피 결합 기능성 음료. 콜드브루 프로틴 스무디 등. 웰니스 트렌드와 맞물려 확산.", tags: ["프로틴커피", "웰니스", "단백질"], hot: "급상승", source: "서울카페쇼", likes: "2026 핵심 트렌드" },
  { name: "저당 디저트", brand: "다수 브랜드", category: "디저트", desc: "20대 저당 관심도 최고. 알룰로스, 스테비아 대체감미료 디저트가 편의점과 카페에서 확대.", tags: ["저당디저트", "헬시플레저", "알룰로스"], hot: "인기", source: "코바코 조사", likes: "건강 트렌드 1위" },
  { name: "컴즈콤보", brand: "컴포즈커피", category: "커피", desc: "66종 음료x17종 디저트=1122가지 콤보. 바이럴 영상 3일만에 100만 조회.", tags: ["컴즈콤보", "컴포즈커피", "꿀조합"], hot: "급상승", source: "인사이트", likes: "유튜브 100만" }
];

const HOT = { "급상승": { icon: "\u{1F680}", bg: "rgba(239,68,68,0.1)", fg: "#dc2626" }, "인기": { icon: "\u{1F525}", bg: "rgba(249,115,22,0.1)", fg: "#ea580c" } };
const CAT_EMOJI = { "\uB514\uC800\uD2B8": "\u{1F370}", "\uC74C\uB8CC": "\u{1F9CB}", "\uCEE4\uD53C": "\u2615", "\uCF00\uC774\uD06C": "\u{1F382}", "\uC74C\uC2DD": "\u{1F37D}\uFE0F" };
const CATS = ["\uC804\uCCB4", "\uB514\uC800\uD2B8", "\uC74C\uB8CC", "\uCEE4\uD53C", "\uCF00\uC774\uD06C", "\uC74C\uC2DD"];

function Card({ item, rank, open, toggle }) {
  const h = HOT[item.hot] || HOT["\uC778\uAE30"];
  const emoji = CAT_EMOJI[item.category] || "\u{1F37D}\uFE0F";
  return (
    <div onClick={toggle} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e8e6e1", cursor: "pointer", overflow: "hidden", boxShadow: open ? "0 2px 12px rgba(0,0,0,0.06)" : "none" }}>
      {rank < 3 && <div style={{ height: 3, background: rank === 0 ? "linear-gradient(90deg,#f59e0b,#f97316)" : rank === 1 ? "linear-gradient(90deg,#94a3b8,#64748b)" : "linear-gradient(90deg,#b45309,#92400e)" }}/>}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, background: rank < 3 ? "#1a1a1a" : "#f0eeea", color: rank < 3 ? "#fff" : "#888" }}>{rank + 1}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a" }}>{item.name}</span>
              <span style={{ fontSize: 16 }}>{emoji}</span>
            </div>
            {item.brand && <div style={{ fontSize: 11.5, color: "#999", marginTop: 1 }}>{item.brand}</div>}
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap", background: h.bg, color: h.fg, alignSelf: "flex-start" }}>{h.icon} {item.hot}</span>
        </div>
        <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, margin: "0 0 8px" }}>{open ? item.desc : item.desc.slice(0, 65) + (item.desc.length > 65 ? "..." : "")}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {item.tags.slice(0, 3).map((t, i) => (<span key={i} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 5, background: "#f0eeea", color: "#888" }}>#{t}</span>))}
          </div>
          {item.likes && <span style={{ fontSize: 11, color: "#999", marginLeft: 6 }}>{"\u2764\uFE0F"} {item.likes}</span>}
        </div>
        {open && (<div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #e8e6e1", display: "flex", gap: 6 }}>
          <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 5, background: "#e8f4fd", color: "#1d6fbb" }}>{item.category}</span>
          <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 5, background: "#f0eeea", color: "#666" }}>{"\uCD9C\uCC98"}: {item.source}</span>
        </div>)}
      </div>
    </div>
  );
}

export default function App() {
  const [cat, setCat] = useState("\uC804\uCCB4");
  const [openId, setOpenId] = useState(null);
  const [q, setQ] = useState("");
  const shown = TRENDS.filter((it) => { if (cat !== "\uC804\uCCB4" && it.category !== cat) return false; if (q && !it.name.includes(q) && !it.desc.includes(q) && !it.tags.some((t) => t.includes(q))) return false; return true; });
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px", fontFamily: "'Noto Sans KR', sans-serif" }}>
      <div style={{ padding: "28px 0 16px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>{"\uC694\uC998 \uB728\uB294 \uB9DB\uC9D1 \uD2B8\uB80C\uB4DC"}</h1>
        <p style={{ fontSize: 13, color: "#999", margin: "4px 0 0" }}>2026{"\uB144"} 3{"\uC6D4"} {"\uAE30\uC900"} · SNS {"\uC778\uAE30"} {"\uC74C\uC2DD"} · {"\uB514\uC800\uD2B8"} · {"\uC74C\uB8CC"}</p>
      </div>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={"\uAC80\uC0C9 (\uC608: \uB9D0\uCC28, \uBC84\uD130\uB5A1, \uC18C\uAE08\uBE75)"} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #e8e6e1", background: "#fff", color: "#1a1a1a", fontSize: 13, outline: "none", fontFamily: "'Noto Sans KR', sans-serif", boxSizing: "border-box", marginBottom: 10 }}/>
      <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
        {CATS.map((c) => (<button key={c} onClick={() => setCat(c)} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid", borderColor: cat === c ? "#1a1a1a" : "#e8e6e1", background: cat === c ? "#1a1a1a" : "#fff", color: cat === c ? "#fff" : "#888", fontSize: 12, fontWeight: cat === c ? 600 : 400, cursor: "pointer", fontFamily: "'Noto Sans KR', sans-serif" }}>{CAT_EMOJI[c] || "\u{1F525}"} {c}</button>))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {shown.map((item, i) => (<Card key={item.name} item={item} rank={i} open={openId === item.name} toggle={() => setOpenId(openId === item.name ? null : item.name)}/>))}
      </div>
      {shown.length === 0 && <div style={{ padding: 32, textAlign: "center", fontSize: 13, color: "#bbb" }}>{"\uD574\uB2F9 \uC870\uAC74\uC5D0 \uB9DE\uB294 \uD2B8\uB80C\uB4DC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4"}</div>}
      <div style={{ marginTop: 20, padding: 14, borderRadius: 10, background: "#fff", border: "1px solid #e8e6e1", fontSize: 11, lineHeight: 1.7, color: "#999" }}>{"\uC774\uD22C\uB370\uC774, \uD55C\uAD6D\uACBD\uC81C, Taste Tomorrow, \uC774\uCF54\uB178\uBBF8\uC2A4\uD2B8, \uC11C\uC6B8\uCE74\uD398\uC1FC \uB4F1 \uC2E4\uC81C \uAE30\uC0AC \uAE30\uBC18 \uB370\uC774\uD130\uC785\uB2C8\uB2E4."}</div>
      <footer style={{ padding: "20px 0 32px", textAlign: "center", fontSize: 11, color: "#ccc" }}>{"\u00A9"} 2026 Food Trends Korea</footer>
    </div>
  );
}
