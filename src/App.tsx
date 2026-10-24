import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, Bug, Smartphone, AlertTriangle, RefreshCw, FileText, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [scriptCode, setScriptCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'guide' | 'simulator' | 'code'>('guide');

  // 시뮬레이터용 상태
  const [simModalOpen, setSimModalOpen] = useState(false);
  const [simTab, setSimTab] = useState<'health' | 'errors' | 'network' | 'console'>('health');
  const [simCopied, setSimCopied] = useState(false);

  useEffect(() => {
    fetch('/Crack-Bridge.user.js')
      .then((res) => res.text())
      .then((text) => {
        setScriptCode(text);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleCopyScript = () => {
    if (!scriptCode) return;
    navigator.clipboard.writeText(scriptCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleSimCopy = () => {
    const sampleReport = `# 🐞 PASTELchat × CRACK 모바일 런타임 진단 보고서 (시뮬레이션 예시)
- 생성 시각: ${new Date().toLocaleString()}
- 버전: 2.2.1-debug
- 접속 URL: https://crack.wrtn.ai/c/demo-chat-id
- 모바일 기기/브라우저: Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36

## 1. 사이트 DOM & 인증 상태
- 상단 헤더 발견: ❌ 미발견 (클래스명 변경 가능성)
- 하단 입력창 발견: ❌ 미발견 (클래스명 변경 가능성)
- 순정 전송버튼 발견: ❌ 미발견 (SVG 패스 변경 가능성)
- 대화방 컨테이너: ❌ 미발견
- React 루트 상태: ✅ 마운트됨
- reCAPTCHA 상태: grecaptcha: O, enterprise: O
- 인증 토큰: captured=O, auth-storage=O, cookie=O
- 채팅방 ID: demo-chat-id
- ⚠️ 페이지 감지 오류 키워드: [새로고침, 오류가 발생]

## 2. 감지된 에러 및 예외 (1건)
### 에러 #1 [window.onerror] (14:02:15)
- 메시지: Uncaught TypeError: Cannot read properties of null (reading 'appendChild')
- 위치: https://crack.wrtn.ai/assets/index.js:42:1502
\`\`\`
TypeError: Cannot read properties of null (reading 'appendChild')
    at moveNativeSendButtonToSlot (Crack-Bridge.user.js:2316:23)
    at injectCustomInputBox (Crack-Bridge.user.js:2294:9)
    at injectBaseDOM (Crack-Bridge.user.js:1898:9)
    at checkAndInject (Crack-Bridge.user.js:5897:9)
\`\`\`

## 3. 최근 네트워크 요청 (3건)
- [14:02:14] GET https://crack-api.wrtn.ai/crack-gen/v3/chats/demo-chat-id ➔ 200
- [14:02:15] GET https://crack-api.wrtn.ai/crack-cash/cash ➔ 401 (Unauthorized)

=== 보고서 끝 ===`;

    navigator.clipboard.writeText(sampleReport).then(() => {
      setSimCopied(true);
      setTimeout(() => setSimCopied(false), 2500);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 최상단 네비게이션 헤더 */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-md shadow-purple-500/20">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight text-white">PASTELchat × CRACK Bridge</h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v2.2.4
                </span>
              </div>
              <p className="text-xs text-slate-400">Next.js React Crash 완벽 해결 & 깨끗한 정식 릴리즈 버전</p>
            </div>
          </div>
          <button
            onClick={handleCopyScript}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-white shadow-sm shadow-emerald-600/30 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨!' : '코드 복사'}</span>
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main className="max-w-4xl mx-auto px-4 py-6 w-full flex-1 flex flex-col gap-6">
        {/* 상태 알림 카드 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-950/30">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                크랙 사이트 오류 완벽 해결 & 정식 릴리즈 완료
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Next.js React 18 <code>removeChild</code> 충돌과 DOM 하이드레이션 오염이 근본적으로 해결되었습니다. 대화방 진입 및 확프 로딩이 정상 확인되어, 임시 진단 플로팅 도구는 완전히 삭제되고 쾌적하고 가벼운 순정 파스텔 인터페이스로 정식 복구되었습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 원클릭 빠른 액션 바 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleCopyScript}
            disabled={loading}
            className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-md shadow-indigo-600/25 active:scale-[0.99] transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '✅ 전체 코드 복사 완료! (Tampermonkey에 붙여넣기)' : '📋 수정된 유저스크립트 전체 복사'}</span>
          </button>

          <a
            href="/Crack-Bridge.user.js"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm transition-all"
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>📥 Tampermonkey 바로 설치 링크 열기</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* 탭 전환 바 */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📱 모바일 진단 방법 가이드
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🕹️ 플로팅 콘솔 미리보기 (체험)
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'code'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📄 전체 코드 보기 ({Math.round((scriptCode?.length || 0) / 1024)} KB)
          </button>
        </div>

        {/* 탭 1: 가이드 */}
        {activeTab === 'guide' && (
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-400" />
                모바일에서 에러 로그 뽑아오는 4단계
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">수정된 코드 반영</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      상단의 <strong>[📋 전체 복사]</strong> 버튼을 누른 뒤, 사용 중인 브라우저(Kiwi, Orion, Safari 등)의 Tampermonkey 확장에 붙여넣고 저장합니다.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">크랙 사이트 접속</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      <code className="text-purple-300">crack.wrtn.ai</code>에 접속하면 우측 하단에 <strong>[🐞 PASTEL 진단]</strong> (에러 발생 시 <strong>[🔴 에러 N건]</strong>) 플로팅 버튼이 뜹니다.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">오류 발생 시 버튼 터치</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      "오류가 발생하여 새로고침하라"는 페이지가 뜨더라도 플로팅 버튼은 화면 맨 위에 살아있습니다. 버튼을 탭하여 진단 창을 엽니다.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200 mb-1">원클릭 복사 후 전송</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      진단 창 상단의 파란색 <strong>[📋 진단 로그 전체 복사]</strong>를 누른 후, 이 채팅창에 그대로 붙여넣기 해주시면 됩니다!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 수집되는 주요 진단 항목 */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5">
              <h3 className="font-bold text-sm text-slate-200 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                로거가 자동으로 감시하는 항목
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <div className="text-slate-400 text-[11px]">런타임 예외</div>
                  <div className="font-bold text-rose-400 mt-0.5">window.onerror</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <div className="text-slate-400 text-[11px]">비동기 에러</div>
                  <div className="font-bold text-amber-400 mt-0.5">unhandledrejection</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <div className="text-slate-400 text-[11px]">API 통신 추적</div>
                  <div className="font-bold text-sky-400 mt-0.5">fetch 인터셉터</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
                  <div className="text-slate-400 text-[11px]">DOM 구조 변경</div>
                  <div className="font-bold text-emerald-400 mt-0.5">헤더/입력창 실시간 스캔</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: 시뮬레이터 (체험) */}
        {activeTab === 'simulator' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4">
            <div>
              <h3 className="font-bold text-base text-white">모바일 환경 플로팅 콘솔 시뮬레이터</h3>
              <p className="text-xs text-slate-400 mt-1">
                실제 크랙 모바일 사이트에서 아래와 같이 우측 하단에 플로팅 버튼이 뜨고, 탭하면 하단 시트 형태로 진단 창이 열립니다.
              </p>
            </div>

            {/* 가상 모바일 뷰포트 시뮬레이션 */}
            <div className="relative w-full max-w-sm mx-auto h-[480px] bg-slate-950 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
              {/* 가상 사이트 헤더 */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                <div className="text-xs font-bold text-slate-400">crack.wrtn.ai</div>
                <div className="text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  ⚠️ 새로고침 오류 화면
                </div>
              </div>

              {/* 가상 사이트 본문 */}
              <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                <AlertTriangle className="w-10 h-10 text-rose-500 mb-2 opacity-80" />
                <div className="font-bold text-sm text-slate-200">일시적인 오류가 발생했습니다</div>
                <p className="text-xs text-slate-500 mt-1">새로고침을 눌러 다시 시도해 주세요.</p>
              </div>

              {/* 시뮬레이터 플로팅 버튼 */}
              <div className="flex justify-end">
                <button
                  onClick={() => setSimModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-950 border-2 border-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/80 active:scale-95 transition-all cursor-pointer animate-pulse"
                >
                  <span>🔴 에러 1건</span>
                </button>
              </div>

              {/* 시뮬레이터 내부 모달 시트 */}
              {simModalOpen && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col justify-end z-20">
                  <div className="bg-slate-900 border-t border-slate-700 rounded-t-2xl max-h-[90%] flex flex-col overflow-hidden">
                    {/* 모달 상단 */}
                    <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                      <span className="font-bold text-xs text-purple-300">🐞 PASTELchat 진단 로거</span>
                      <button
                        onClick={() => setSimModalOpen(false)}
                        className="text-xs text-slate-400 hover:text-white px-2 py-1"
                      >
                        ✕
                      </button>
                    </div>

                    {/* 복사 버튼 */}
                    <div className="p-2.5 bg-slate-950/80 border-b border-slate-800 flex gap-2">
                      <button
                        onClick={handleSimCopy}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-1"
                      >
                        {simCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{simCopied ? '복사되었습니다!' : '📋 진단 로그 전체 복사'}</span>
                      </button>
                    </div>

                    {/* 탭 */}
                    <div className="flex border-b border-slate-800 text-[11px] bg-slate-950 px-2 gap-1 overflow-x-auto">
                      <button
                        onClick={() => setSimTab('health')}
                        className={`py-1.5 px-2 font-bold ${simTab === 'health' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400'}`}
                      >
                        🔍 상태
                      </button>
                      <button
                        onClick={() => setSimTab('errors')}
                        className={`py-1.5 px-2 font-bold ${simTab === 'errors' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400'}`}
                      >
                        🚨 에러 (1)
                      </button>
                      <button
                        onClick={() => setSimTab('network')}
                        className={`py-1.5 px-2 font-bold ${simTab === 'network' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-slate-400'}`}
                      >
                        🌐 통신
                      </button>
                    </div>

                    {/* 내용 */}
                    <div className="p-3 text-[11px] overflow-y-auto max-h-56 space-y-2">
                      {simTab === 'health' && (
                        <div className="space-y-1.5 text-slate-300">
                          <div><strong>상단 헤더:</strong> <span className="text-rose-400">❌ 미발견</span></div>
                          <div><strong>하단 입력바:</strong> <span className="text-rose-400">❌ 미발견</span></div>
                          <div><strong>전송 버튼:</strong> <span className="text-rose-400">❌ 미발견</span></div>
                          <div><strong>토큰 감지:</strong> <span className="text-emerald-400">✅ 캡처됨</span></div>
                          <div className="text-[10px] text-amber-300 pt-1 border-t border-slate-800">
                            * 사이트 업데이트로 클래스명이 바뀌었음을 즉시 감지함!
                          </div>
                        </div>
                      )}

                      {simTab === 'errors' && (
                        <div className="p-2 rounded bg-rose-950/60 border border-rose-800 text-rose-200 space-y-1">
                          <div className="font-bold text-rose-300">TypeError: Cannot read properties of null (reading 'appendChild')</div>
                          <div className="text-[10px] text-slate-400 font-mono">at moveNativeSendButtonToSlot (Crack-Bridge.user.js:2316)</div>
                        </div>
                      )}

                      {simTab === 'network' && (
                        <div className="space-y-1 text-slate-300 font-mono text-[10px]">
                          <div className="flex justify-between"><span>GET /crack-gen/v3/chats</span><span className="text-emerald-400">200</span></div>
                          <div className="flex justify-between"><span>GET /crack-cash/cash</span><span className="text-rose-400">401</span></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 탭 3: 전체 코드 보기 */}
        {activeTab === 'code' && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">수정된 Crack-Bridge.user.js 원문 코드</h3>
                <p className="text-xs text-slate-400">상단 에러 인터셉터 + 하단 모바일 진단 콘솔이 포함된 전체 코드입니다.</p>
              </div>
              <button
                onClick={handleCopyScript}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white hover:bg-purple-500 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨!' : '전체 복사'}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 max-h-[500px] overflow-y-auto overflow-x-auto leading-relaxed">
                {loading ? '스크립트 로딩 중...' : scriptCode}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* 하단 푸터 */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        PASTELchat × CRACK Bridge Mobile Diagnostic System • AI Studio Engine
      </footer>
    </div>
  );
}
