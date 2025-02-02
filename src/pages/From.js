import React, { useCallback, useState, useRef } from "react";
import axios from "axios"; // axios import 추가
import "./From.css";
import Quill from "quill";

import rolling_icon from "../images/logo.svg";
import default_profile from "../images/From_img/profile.svg";
import btn_plus from "../images/From_img/Btn_plus.svg";

/* 텍스트 에디터 */
import TextArea from "../component/TextArea";

/* select 박스 */
import arrowTop from "../images/From_img/arrow_top.svg";
import arrowDown from "../images/From_img/arrow_bottom.svg";

/* 예시 이미지 */
const ex_img = [
  "https://i.ibb.co/YBLJML7/Frame-2593.png",
  "https://images.pexels.com/photos/10718305/pexels-photo-10718305.jpeg",
  "https://images.pexels.com/photos/1716861/pexels-photo-1716861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/7829101/pexels-photo-7829101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1606655/pexels-photo-1606655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/10987077/pexels-photo-10987077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/25916115/pexels-photo-25916115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/15009816/pexels-photo-15009816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const From = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(""); // name 에러 상태
  const [profileImageURL, setProfileImageURL] = useState(default_profile);
  const [relationship, setRelationship] = useState("지인");
  const [font, setFont] = useState("Noto Sans");
  const [quillValue, setQuillValue] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // 버튼 비활성화 상태 추가

  const textContainerRef = useRef(null);

  // 이름 입력 처리
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 이름 입력 필드에서 포커스를 잃었을 때 에러 상태 처리
  const handleNameBlur = () => {
    if (!name) {
      setNameError("값을 입력해 주세요.");
    } else {
      setNameError(""); // 값이 있으면 에러 메시지 초기화
    }
  };

  const handleQuillValue = useCallback((value) => {
    const cleanedHtml = value.replace(/<p><br><\/p>/g, ""); // 줄바꿈 시 자동 생성 태그 없앰
    setQuillValue(cleanedHtml);
  }, []);

  // 이미지 업로드
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageURL(reader.result); // 업로드한 이미지 URL을 상태로 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log("이름:", name);
    console.log("선택된 프로필:", profileImageURL);
    console.log("선택된 관계:", relationship);
    console.log("에디터 내용:", quillValue);
    console.log("선택된 폰트:", font);
  };

  /* 메시지 생성 API */
  const sendMessage = async () => {
    const url =
      "https://rolling-navy.vercel.app/13-1/recipients/9761/messages/";
    const data = {
      sender: name,
      profileImageURL: profileImageURL,
      relationship: relationship,
      content: quillValue,
      font: font,
    };

    console.log("전송할 데이터:", data);

    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("메시지가 성공적으로 전송되었습니다!");
      } else {
        alert("메시지 전송에 실패했습니다.");
      }
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error);
      alert("오류가 발생했습니다.");
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
            className={`name_input ${nameError ? "error" : ""}`}
            placeholder="이름을 입력해 주세요."
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur} // 포커스 아웃 시 에러 체크
          />
          {nameError && <p className="name-error_message">{nameError}</p>}{" "}
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

              {/* 프로필 이미지 영역 */}
              <div className="profile_list_image">
                {/* 사용자 이미지 파일*/}
                <img
                  className="custom_image"
                  src={btn_plus}
                  alt="프로필 이미지"
                  onClick={() => document.getElementById("fileInput").click()} // 클릭 시 파일 선택 input 활성화
                />

                {/* 기본 프로필 이미지들 */}
                {[...Array(7)].map((_, index) => (
                  <img
                    key={index}
                    className="list_image"
                    src={ex_img[index % ex_img.length]}
                    alt={`프로필 이미지 ${index + 1}`}
                    onClick={
                      () => setProfileImageURL(ex_img[index % ex_img.length]) // 기본 이미지로 변경
                    }
                  />
                ))}
              </div>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }} // 파일 선택 input은 화면에 보이지 않게 숨김
                onChange={handleImageUpload}
              />
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
          <button
            className="btn_send"
            onClick={handleSubmit}
            disabled={!name || !quillValue}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default From;
