import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Layout, 
  Sliders, 
  Code2, 
  RefreshCw, 
  Smartphone, 
  Terminal,
  Check
} from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(56);
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'code'>('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const copyScriptLink = () => {
    const url = window.location.origin + '/Crack-Bridge.user.js';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
            PB
          </div>
          <div>
            <h1 className="font-semibold text-slate-100 text-sm flex items-center gap-2">
              PASTELchat × CRACK Native Bridge
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                v1.0.0 Ready
              </span>
            </h1>
            <p className="text-xs text-slate-400">UserScript Native Engine & Mobile Layout Runtime</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={copyScriptLink}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-md transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'URL 복사 완료!' : '설치 URL 복사'}</span>
          </button>
          <a
            href="/Crack-Bridge.user.js"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs bg-teal-600 hover:bg-teal-500 text-white font-medium px-3.5 py-1.5 rounded-md shadow-sm transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>유저스크립트 직접 설치</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 mb-6 gap-6 text-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 ${
              activeTab === 'overview'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            핵심 수정 내역 및 상태
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 ${
              activeTab === 'simulator'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            모바일 헤더 간격 시뮬레이터
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 ${
              activeTab === 'code'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            주요 패치 코드 검증
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Resolution Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Problem 1 Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2.5 text-teal-400 font-medium">
                  <Layout className="w-5 h-5 text-teal-400" />
                  <span>1. 상단 헤더 & 스토리 헤더 0px 밀착 및 잘림 해소</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-rose-400 font-semibold block mb-1">발생 원인:</span>
                    서브 헤더 제목 버튼 컨테이너(<code className="text-amber-300">div:has(&gt; button)</code>)에 상단 고정 스타일이 중복 부여되어 제목 요소가 잘리고, 모바일 헤더 높이 변화(48~56px)에 따라 빈 틈이 발생함.
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-emerald-400 font-semibold block mb-1">적용된 조치:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li>자식 요소 고정 해제 및 수직 중앙 정렬(<code className="text-teal-300">align-items: center</code>) 보장</li>
                      <li><code className="text-teal-300">syncHeaderPositions()</code> 추가로 상단 헤더 높이를 동적으로 읽어 서브 헤더를 0px 간격으로 자동 밀착</li>
                      <li>창 크기 변경 및 스크롤 이벤트 발생 시 실시간 동기화</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>모바일 뷰포트 오차 없는 0px 밀착 완료</span>
                </div>
              </div>

              {/* Problem 2 Card */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2.5 text-teal-400 font-medium">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  <span>2. App Check 토큰 오류 및 7일 유효기간 자동 복원</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-rose-400 font-semibold block mb-1">발생 원인:</span>
                    reCAPTCHA v3 스크립트와 지속성 토큰이 강제 삭제되어 검증 실패가 발생하고, 잘못 발급된 토큰이 7일간 캐시되어 로어 저장소 요청 시 <code className="text-rose-300">appcheck token is invalid</code>가 반복됨.
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-emerald-400 font-semibold block mb-1">적용된 조치:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li>사용자의 7일 토큰 보존 정책 유지 + v3 & Enterprise 듀얼 호환 복구</li>
                      <li><code className="text-teal-300">fetchWithAppCheckRetry()</code> 래퍼로 401/403 감지 시 캐시 즉시 무효화 및 강제 재발급 1회 자동 재시도</li>
                      <li>우측 서랍 API 설정 내 프로바이더 선택 및 수동 토큰 갱신 버튼 추가</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Self-Healing 자가 복구 및 7일 유효 캐시 보존 완료</span>
                </div>
              </div>
            </div>

            {/* Quick Script Info Box */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-slate-200">Tampermonkey / Violentmonkey 설치 안내</h3>
                <p className="text-xs text-slate-400">
                  브라우저의 유저스크립트 관리자에 상단 <span className="text-teal-300">[유저스크립트 직접 설치]</span> 버튼을 누르면 즉시 최신 패치 코드가 등록됩니다.
                </p>
              </div>
              <button
                onClick={copyScriptLink}
                className="shrink-0 text-xs bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 px-4 py-2 rounded-lg transition"
              >
                {copied ? '복사되었습니다' : '스크립트 URL 복사하기'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Sliders className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-medium text-slate-300">상단 메인 헤더 시뮬레이션 높이:</span>
                <div className="flex gap-2">
                  {[48, 50, 52, 56].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHeaderHeight(h)}
                      className={`text-xs px-2.5 py-1 rounded border transition ${
                        headerHeight === h
                          ? 'bg-teal-600 border-teal-500 text-white font-medium'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {h}px {h === 56 ? '(기본)' : '(모바일 브라우저)'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded transition flex items-center gap-1.5"
              >
                <span>서랍 열기/닫기 테스트</span>
              </button>
            </div>

            {/* Mobile Viewport Frame */}
            <div className="max-w-md mx-auto bg-slate-900 border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
              {/* Simulated Native Main Header */}
              <div 
                style={{ height: `${headerHeight}px` }} 
                className="bg-white text-slate-900 px-4 border-b border-slate-200 flex items-center justify-between select-none shrink-0 transition-all duration-200 z-30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-slate-200"></div>
                  <span className="text-xs font-bold text-slate-800">CRACK</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-600">헤더 높이: {headerHeight}px</div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-100"></div>
                </div>
              </div>

              {/* Simulated Story Subheader (Directly Attached with 0px gap) */}
              <div 
                style={{ top: `${headerHeight}px` }}
                className="bg-white/95 backdrop-blur text-slate-800 h-12 px-4 border-b border-slate-200 flex items-center justify-between select-none shadow-sm z-20 shrink-0 sticky transition-all duration-200"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-teal-600">
                    <span className="truncate max-w-[150px]">Highfield Prep: 제 1화</span>
                    <span className="text-[10px] text-slate-400 font-normal">▼</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200 font-medium">
                    0px 밀착 성공
                  </span>
                  <button 
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    className="w-7 h-7 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs"
                    title="우측 보조 메뉴 서랍 열기"
                  >
                    ☰
                  </button>
                </div>
              </div>

              {/* Simulated Conversation Body */}
              <div className="flex-1 bg-slate-50 p-4 overflow-y-auto space-y-3 relative text-slate-800 text-xs">
                <div className="text-center text-[10px] text-slate-400 py-1">2026. 10. 31 (모바일 뷰포트 시뮬레이션)</div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs max-w-[85%]">
                  <p className="font-semibold text-teal-700 text-[11px] mb-1">캐릭터</p>
                  <p className="text-slate-700 leading-relaxed">
                    상단 메인 헤더와 스토리 서브 헤더 사이에 빈 공간이 전혀 없이 완벽히 0px로 밀착됩니다.
                  </p>
                </div>
                <div className="bg-teal-50 p-3 rounded-xl border border-teal-200 shadow-xs max-w-[85%] ml-auto text-slate-800">
                  <p className="text-slate-800 leading-relaxed">
                    모바일 주소창 축소/확장 시에도 자식 그리드가 잘리지 않고 제목 버튼이 온전히 중앙 정렬됩니다.
                  </p>
                </div>
              </div>

              {/* Simulated Drawer Overlay and Drawer Container */}
              {drawerOpen && (
                <>
                  <div 
                    onClick={() => setDrawerOpen(false)}
                    style={{ top: `${headerHeight + 48}px` }}
                    className="absolute inset-x-0 bottom-0 bg-black/40 z-40 transition-opacity"
                  />
                  <div 
                    style={{ top: `${headerHeight + 48}px` }}
                    className="absolute right-0 bottom-0 w-64 bg-white z-50 border-l border-slate-200 shadow-xl p-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-800">API 및 모델 설정</span>
                        <button onClick={() => setDrawerOpen(false)} className="text-slate-400 text-sm">✕</button>
                      </div>
                      <div className="space-y-2 text-[11px]">
                        <div className="flex rounded border border-slate-200 overflow-hidden">
                          <button className="flex-1 py-1 bg-slate-100 text-slate-600 font-medium">Gemini</button>
                          <button className="flex-1 py-1 bg-teal-600 text-white font-medium">Firebase</button>
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <label className="text-[10px] text-slate-500 font-semibold">App Check 프로바이더:</label>
                          <select className="w-full text-[11px] p-1.5 rounded border border-slate-200 bg-slate-50 text-slate-800">
                            <option>reCAPTCHA v3 (표준 7일)</option>
                            <option>reCAPTCHA Enterprise</option>
                          </select>
                          <button className="w-full py-1 text-[11px] bg-teal-50 text-teal-700 border border-teal-300 rounded font-medium mt-1">
                            ✨ 7일 토큰 즉시 갱신
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 text-center">
                      PASTELchat Native Engine
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-teal-400">1. 헤더 동적 동기화 (syncHeaderPositions)</span>
                <span className="text-[11px] text-slate-400">Crack-Bridge.user.js : lines 5973~5986</span>
              </div>
              <pre className="text-xs font-mono bg-slate-950 p-4 rounded-lg text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
{`function syncHeaderPositions() {
    const topHeader = document.querySelector('header') || document.querySelector('div[class*="group/lnb-header"]');
    const subHeader = document.querySelector('.absolute.z-docked.left-0.w-full.h-12') || document.querySelector('div.h-12.px-5.flex.justify-between.items-center')?.parentElement;
    
    if (topHeader) {
        const h = Math.round(topHeader.getBoundingClientRect().height) || 56;
        document.documentElement.style.setProperty('--crack-top-header-height', \`\${h}px\`);
        if (subHeader) {
            subHeader.style.setProperty('top', \`\${h}px\`, 'important');
            subHeader.style.setProperty('margin-top', '0px', 'important');
        }
    }
}`}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-teal-400">2. App Check 자가복구 재시도 래퍼 (fetchWithAppCheckRetry)</span>
                <span className="text-[11px] text-slate-400">Crack-Bridge.user.js : lines 4274~4330</span>
              </div>
              <pre className="text-xs font-mono bg-slate-950 p-4 rounded-lg text-slate-300 overflow-x-auto leading-relaxed border border-slate-800">
{`// 401/403 또는 invalid 발생 시 즉시 무효화 및 getAppCheckToken(true) 강제 재발급 후 1회 재시도
let res = await runFetch(buildHeaders(appCheckToken));
if (!res.ok) {
    const errBody = await res.text();
    const isAppCheckError = res.status === 401 || res.status === 403 || /appcheck|app[\\s_-]*check/i.test(errBody);
    if (isAppCheckError && url.includes('firebasevertexai')) {
        console.warn("⚠️ [PASTEL:AppCheck] App Check 토큰 오류 감지 ➔ 7일 토큰 강제 갱신 후 1회 재시도:", errBody.slice(0, 120));
        try {
            const freshToken = await getAppCheckToken(true);
            if (freshToken) {
                res = await runFetch(buildHeaders(freshToken));
            }
        } catch (rErr) {
            console.warn("⚠️ [PASTEL:AppCheck] 토큰 갱신 재시도 예외:", rErr);
        }
    }
}`}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        PASTELchat × CRACK Native Bridge Engine &middot; Userscript File: <code className="text-slate-400">/Crack-Bridge.user.js</code>
      </footer>
    </div>
  );
}
