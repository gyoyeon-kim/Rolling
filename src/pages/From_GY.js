import React from "react";
import "./From_GY.css";

import rolling_icon from "../images/logo.svg";
import default_profile from "../images/From_img/profile.svg";

const From_GY = () => {
  return (
    <div className="main">
      <div className="header">
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
          ></input>
        </div>
        <div className="profileimg">
          <p className="title">프로필 이미지</p>
          <div className="profile_content">
            <img
              className="default_profile"
              src={default_profile}
              alt="기본 프로필 이미지"
            />
            <div className="profile_list">
              <p className="profile_list-p">프로필 이미지를 선택해주세요!</p>
              <div className="profile_list_image">
                {[...Array(7)].map((_, index) => (
                  <img
                    key={index}
                    className="list_image"
                    src={default_profile}
                    alt={`기본 프로필 이미지 ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relation">
          <p className="title">상대와의 관계</p>
          <select className="selection">
            <option value="friend">친구</option>
            {/*추후 기본값 usestate로 변경*/}
            <option value="acquaintance" selected>
              지인
            </option>
            <option value="partner">동료</option>
            <option value="family">가족</option>
          </select>
        </div>

        <div className="content">
          <p className="title">내용을 입력해 주세요</p>
        </div>

        <div className="font">
          <p className="title">폰트 선택</p>
          <select className="selection">
            <option value="Pretendard">Pretendard</option>
            {/*추후 기본값 usestate로 변경*/}
            <option value="Noto Sans" selected>
              Noto Sans
            </option>
            <option value="나눔명조">나눔명조</option>
            <option value="f나눔손글씨 손편지체">나눔손글씨 손편지체</option>
          </select>
        </div>

        <div>
          <button className="btn_send"> 보내기 </button>
        </div>
      </div>
    </div>
  );
};

export default From_GY;
