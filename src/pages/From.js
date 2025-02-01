import React, { useCallback, useState, useRef } from "react";
import "./From.css";

import rolling_icon from "../images/logo.svg";
import default_profile from "../images/From_img/profile.svg";

/* 텍스트 에디터 */
import TextArea from "../component/TextArea";

/* select 박스 */
import arrowTop from "../images/From_img/arrow_top.svg";
import arrowDown from "../images/From_img/arrow_bottom.svg";

const From_GY = () => {
  const [name, setName] = useState(""); // 이름 상태 추가
  const [profileImageURL, setProfileImageURL] = useState(default_profile); // 프로필 이미지 URL 상태 추가
  const [relationship, setRelationship] = useState("지인"); // 관계 상태 추가
  const [font, setFont] = useState("Noto Sans"); // 폰트 상태 추가
  const [quillValue, setQuillValue] = useState("");

  const textContainerRef = useRef(null);

  // 에디터 상태 변경 함수
  const handleQuillValue = useCallback((value) => {
    const cleanedHtml = value.replace(/<p><br><\/p>/g, "");
    setQuillValue(cleanedHtml);
  }, []);

  // 버튼 클릭 시 데이터 확인
  const handleSubmit = () => {
    console.log("🟢 최종 데이터 제출:");
    console.log("이름:", name);
    console.log("선택된 프로필:", profileImageURL);
    console.log("선택된 관계:", relationship);
    console.log("에디터 내용:", quillValue);
    console.log("선택된 폰트:", font);
  };

  // API 요청 보내기 함수
  const sendMessage = async () => {
    const url =
      "https://rolling-api.vercel.app/13-1/recipients/{recipientId}/messages/";
    const data = {
      sender: name,
      profileImageURL: profileImageURL,
      relationship: relationship,
      content: quillValue,
      font: font,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("메시지가 성공적으로 전송되었습니다!");
      } else {
        //alert("메시지 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
      //alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="main">
      <div className="fromheader">
        <a href="/">
          <img className="logo" src={rolling_icon} alt="롤링 이미지" />
        </a>
      </div>
      <div className="from_main">
        <div className="name">
          <p className="title">From.</p>
          <input
            className="name_input"
            placeholder="이름을 입력해 주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profileimg">
          <p className="title">프로필 이미지</p>
          <div className="profile_content">
            <img
              className="default_profile"
              src={profileImageURL}
              alt="프로필 이미지"
            />
            <div className="profile_list">
              <p className="profile_list-p">프로필 이미지를 선택해주세요!</p>
              <div className="profile_list_image">
                {[...Array(7)].map((_, index) => (
                  <img
                    key={index}
                    className="list_image"
                    src={default_profile} // 실제 이미지 URL을 사용 예정
                    alt={`프로필 이미지 ${index + 1}`}
                    onClick={() => setProfileImageURL(default_profile)} // 클릭 시 변경
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relation">
          <p className="title">상대와의 관계</p>
          <select
            className="selection"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          >
            <option value="친구">친구</option>
            <option value="지인">지인</option>
            <option value="동료">동료</option>
            <option value="가족">가족</option>
          </select>
        </div>

        <div className="content">
          <p className="contnetp">내용을 입력해 주세요</p>
          <TextArea
            onQuillValueChange={handleQuillValue}
            textContainerRef={textContainerRef}
          />
        </div>

        <div className="font">
          <p className="title">폰트 선택</p>
          <select
            className="selection"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            <option value="Pretendard">Pretendard</option>
            <option value="Noto Sans">Noto Sans</option>
            <option value="나눔명조">나눔명조</option>
            <option value="나눔손글씨 손편지체">나눔손글씨 손편지체</option>
          </select>
        </div>

        <div>
          <button className="btn_send" onClick={sendMessage}>
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default From_GY;
