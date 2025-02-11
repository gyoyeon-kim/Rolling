# 💻 Project : Rolling
평소에 쉽게 전하지 못했던 진심을 소중한 마음을 담아 특별한 롤링페이퍼로 전해보세요! 

> 코드잇 스프린트 : 프론트엔드 13기 PART2 1팀
>
> 개발 기간: 2025.1.23 ~ 2.11

URL: https://rolling-navy.vercel.app/

## 🎯 프로젝트 목표

**일정 준수**
- 각 개발 단계(기획, 디자인, 개발, 테스트)에 대한 구체적인 일정을 설정한다.
  
**최선의 완성**
- 작동하는 코드가 아닌, 사용성까지 고려한 코드를 개발한다.
  
**참된 협업**
- 모든 결정 사항은 공유하고, 문제는 솔직하게 논의한다.

## 📋 프로젝트 소개
**프로젝트 주제** : 롤링페이퍼

**선정배경**:  기존 SNS에서는 가벼운 피드백이 많아 진심 어린 메시지를 담기 어렵다는 점을 발견

**활용방안**
- 생일, 졸업식, 기념일 등 특별한 날을 기념할 때
- 팀 프로젝트 종료 후 서로에게 전하는 감사 메시지
- 평소에 말하지 못했던 진심을 전하고 싶을 때

## ⚙️ 기술 스택 

**✅ 개발 환경**
<div>
  <img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"> 
</div>

**✅ Front-End**
<div>
  
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
</div>

**✅ 협업**
<div style="margin: ; text-align: left;" "text-align: left;"> 
   <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
   <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
</div>

## 🔍팀원 소개


<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/codeit-kkm">
      <img width=200px src="https://avatars.githubusercontent.com/u/189808233?v=4" alt=""/><br />
      <sub><b>[FE] 김경민</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/gyoyeon-kim">
      <img width=200px src="https://avatars.githubusercontent.com/u/81516127?v=4" alt=""/><br />
      <sub><b>[FE] 김교연</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/Supi001">
      <img width=200px src="https://avatars.githubusercontent.com/u/189813561?v=4" alt=""/><br />
      <sub><b>[FE] 이성준</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/eplssun">
      <img width=200px src="https://avatars.githubusercontent.com/u/85532508?v=4" alt=""/><br />
      <sub><b>[FE] 이현선</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/bohee-hee">
      <img width=200px src="https://avatars.githubusercontent.com/u/196118653?v=4" alt=""/><br />
      <sub><b>[FE] 홍보희</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

## 💡역할분담

### **🌟김경민**

> **맡은 파트:** '/post' 페이지
>
> **주요 기능:** 배경 선택 기능, 유효성 검사 적용
>
> **주요 기능 설명:**
> - 컬러 ↔ 이미지 선택 가능 ( 스위치 UI )
> - 4가지 컬러 또는 4가지 이미지 중 선택 가능
> - 이미지 URL을 입력 기능을 추가해서 원하는 이미지를 직접 불러올 수 있도록 구현
> - 필수 입력값이 모두 입력 되면 “생성하기” 버튼 활성화
> - 버튼 클릭 시 새로운 롤링페이퍼 생성 및 해당 페이지( /post/{id} )로 이동
>
> **향후 개선 방향:**
> - 미리보기 기능 추가
>   - 직관적인 UI제공으로 사용자가 선택한 배경이 어떻게 보일지 바로 확인 가능
> - 다양한 배경 옵션
>   - 컬러 팔레트 추가로 더 많은 색상 제공 및 사용자의 자유도 증가
> - 반응형 UI
>   - 모바일/ 태블릿에서 보기 편하도록 화면 크기에 따라 요소 크기 변화
>   


### **🌟김교연**

> **맡은 파트:** '/post/{id}/message' 페이지
>
> **주요 기능:** 메세지 작성 기능, 프로필 이미지, 메세지 데이터 서버 전송
>
> **주요 기능 설명:**
> - 외부 텍스트 에디터를 활용한 메세지 내용 작성 기능 구현
>   - React Quill 에디터 라이브러리 사용
> - 프로필 이미지를 외부 api를 통해 불러올 수 있도록 설정
>   - Cloudinary api를 사용
> - 필수창에 값이 들어가지 않을 경우 에러 메세지 설정
> - Mobile, Tablet 환경에서 input창, 프로필 사진, 외부 에디터가 작동될 수 있게 반응형 웹으로 제작
> >
> **기타 수행 사항:**
> - font, color 공통화 작업
> - 팀 초기 컨벤션 세팅 설정
> - Vercel를 통한 CI / CD 구축
>   
 


### **🌟이현선**

> **맡은 파트:** '/post/{id}' 페이지
>
> **주요 기능:** 롤링페이퍼의 메시지 목록 및 이모지(emoji) 확인 기능, 카카오톡 공유 기능 및 URL 복사 기능
>
> **주요 기능 설명:**
> - 카드 화면을 아래로 스크롤 시, 무한 스크롤을 통해 추가 메시지 데이터 로드
> - 메시지 카드에서 휴지통 버튼을 클릭하면 작성자가 직접 입력한 해당 메시지 삭제 가능
> - 이모지 리액션 기능 구현
>   - emoji-picker-react 라이브러리를 사용하여 이모지 추가 기능 구현
>   - API와 연동하여 이모지 데이터를 저장하고 불러오기
>   - 이모지를 추가할 때마다 인기 순으로 자동 재정렬
> - 메시지 작성 및 삭제 기능 구현
>   - 메시지 삭제 시 비밀번호 확인 절차를 추가하여 보안 강화 
> - 롤링페이퍼 페이지 UI 및 API 연동
>   - 서브 헤더 구성(postHeader)
>   - 카드 컴포넌트
>   - 배경화면 설정
>  - 공용 컴포넌트 개발
>    - Header, 커서이펙트, 로딩 스피터, 배지, 이모지 리스트, 공유버튼 컴포넌트
> >
> **기타 수행 사항:**
> - 협업툴 노션 관리
> - Git 협업
>   
  

### **🌟이성준**

> **맡은 파트:** '/' 페이지
>
> **주요 기능:** 사이트에 대한 대략적인 개요 화면 페이지 구성
>
> **주요 기능 설명:**
> - '구경해보기' 버튼 클릭 시, 롤링페이퍼 목록 페이지로 이동
> - ‘롤링페이퍼 만들기’ 버튼 클릭시 롤링페이퍼 만들기 페이지로 이동
> - PC, 태블릿, 모바일 반응형 Navigation 컴포넌트 구현 
>   - 네비게이션 컴포넌트(헤드) Fixed 적용
>   - 구경하러 가기 부분 Sticky 적용
>   - 이미지가 컨테이너 크기를 초과시 이미지 스크롤 적용
>   - 태블릿 반응형 ‘구경하러 가기’ 버튼 구현
>     
 

### **🌟홍보희**

> **맡은 파트:** ' /list' 페이지
>
> **주요 기능:** 생성된 롤링페이퍼의 데이터들을 인기순, 최신 생성순으로 정렬
>
> **주요 기능 설명:**
> - 생성된 롤링페이퍼 카드 목록에서 카드를 누를 경우, 해당 데이터에 맞는 롤링페이퍼 페이지로 이동
> - '나도 만들어보기' 버튼 클릭 시, 롤링페이퍼 생성 페이지로 이동
> - 롤링페이퍼 카드 목록 정렬 방식 구현
>   - 인기순 : 메세지를 많이 받은 롤링페이퍼를 기준으로 정렬
>   - 최신순 : 최근 생성된 롤링페이퍼를 기준으로 정렬
> - Mobile, Tablet 환경에서의 터치 슬라이드 구현
>   
> **기타 수행 사항:**
> - 팀장
> - 회고록 및 회의 기록 정리
>     
> **페이지 Preview:**  
