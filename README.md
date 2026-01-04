# Teddy AI Connect 🧸💬

**Teddy AI Connect**는 모던한 다크 모드 UI와 "페이지와 대화하기" 기능을 제공하는 React 기반 웹 애플리케이션입니다. 사용자는 현재 보고 있는 페이지의 내용을 바탕으로 AI(ChatGPT2 모의 서비스)와 대화할 수 있습니다.

## ✨ 주요 기능

- **프리미엄 다크 모드**: 눈이 편안하고 세련된 `slate` / `blue-gray` 톤의 다크 테마를 기본으로 제공합니다.
- **AI 채팅 통합**: 페이지 우측 하단의 플로팅 버튼을 통해 언제든지 채팅창을 열 수 있습니다.
- **페이지 컨텍스트 인식**: 채팅 시 현재 페이지의 텍스트 내용을 AI에게 함께 전송하여, 문맥에 맞는 대화가 가능합니다.
- **반응형 디자인**: 다양한 화면 크기에 최적화된 UI를 제공합니다.

## 🛠 기술 스택

- **Core**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Variables, CSS Modules)
- **Design**: Premium Dark Theme Custom Implementation

## 🚀 시작하기

이 프로젝트를 로컬에서 실행기 위해서는 Node.js가 필요합니다.

### 1. 저장소 클론
```bash
git clone https://github.com/shldhee/teddy-ai-connect.git
cd teddy-ai-connect
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` (또는 터미널에 표시된 포트)로 접속하여 앱을 확인하세요.

## 📂 프로젝트 구조

```
src/
├── components/     # UI 컴포넌트 (ChatBox 등)
├── services/       # 비즈니스 로직 (chatService 등)
├── utils/          # 유틸리티 함수 (pageContext 등)
├── styles/         # CSS 스타일 파일
└── App.tsx         # 메인 애플리케이션 컴포넌트
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
