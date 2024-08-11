import { Outlet } from "react-router-dom";

function About() {
    return (
      <div>
        <h4>회사 정보</h4>
        {/* Nested Route된 것들 보여줄 자리는 아웃렛으로 선언 */}
        <Outlet></Outlet>
      </div>
    );
}

export default About;