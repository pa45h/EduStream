import signupImg from "../assets/Images/signup.jpg"
import Template from "../components/core/Auth/Template"

function Signup() {
    return (
        <Template 
            title = "Join EduStream for free"
            description2 = "Education to future-proof your career."
            image = {signupImg}
            formType = "signup"
        />
    )
}

export default Signup
