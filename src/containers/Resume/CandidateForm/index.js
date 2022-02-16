import { Container, Row, Col } from "react-bootstrap";
import { useEffect,useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import StepFive from "./StepFive";
import StepSix from "./StepSix";
import StepSeven from "./StepSeven";
import { useSelector, useDispatch } from "react-redux";
import {  fetchCandidateData  } from "../../../actions/Candidate";
import _ from 'lodash';
import BlockUI from "../../../components/BlockUI";

function CandidateMultiStep(props) {

  console.log(props, "  props")
  //state for steps
  const [step, setstep] = useState(3);
  const cdIdData = JSON.parse(localStorage.getItem("data"));
  const [filData,setFilData] = useState(null)
  const [isData,setIsData] = useState(false)
  const cdId =cdIdData.id;
  const dispatch = useDispatch(); 
  const userData = useSelector( (state) => state.candidate);
  const { candidateInfo, blocking } = userData;

  useEffect(() => {
      dispatch(fetchCandidateData(cdId));
  }, []);
 
 
 if(cdIdData && typeof userData != "undefined" && (_.size(userData) > 0)){
     // console.log("demo ",typeof userData)
     
        if (filData !== null){
          setFilData(userData)
        }
}
   console.log('candidateInfo  ',userData);
   /*if(userData){
     console.log("userData ", userData)
   }
 if(!_.isEmpty(candidateInfo && isData === false)){
    
     setIsData(true) 
      
     console.log('candidateInfo1',candidateInfo,isData);
    
   setTimeout(function(){ setFilData(candidateInfo) }, 200);
  }*/

  



  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    city: "",
    zip: "",
    country: "",
    email: "",
    phone: "",
    employer: "",
    emptitle: "",
    empCity: "",
    empState: "",
    startDate: "",
    startYear: "",
    endDate: "",
    endDate: "",
    jd: ""
  })

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
 
  const handleInputData = input => e => {
    // input value from the form
    const {value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }
  

console.log('userData.candidateInfo',userData.candidateInfo);

// javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <BlockUI blocking={blocking} />
          <Container>
            <Row>
              <Col>
            { !_.isEmpty(userData.candidateInfo) ? <StepOne 
                  nextStep={() => nextStep()} 
                  handleFormData={userData?.candidateInfo} 
                  name={userData?.candidateInfo?.name} 
                  cdId={cdId}
                /> :'' }
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="App">
          <BlockUI blocking={blocking} />
          <Container>
            <Row>
              <Col  md={{ span: 12 }}>
              { !_.isEmpty(userData.candidateInfo) ? <StepTwo 
                  nextStep={() => nextStep()} 
                  prevStep={prevStep} 
                  handleFormData={userData?.candidateInfo} 
                  cdId={cdId}
                /> :'' }
              </Col>
            </Row>
          </Container>
        </div>
      );
      case 3:
      return (
        <div className="App">
          <BlockUI blocking={blocking} />
          <Container>
            <Row>
              <Col>
                <StepThree 
                   nextStep={() => nextStep()} 
                   prevStep={prevStep} 
                   handleFormData={userData?.candidateInfo} 
                   cdId={cdId}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
      case 4:
      return (
        <div className="App">
          <BlockUI blocking={blocking} />
          <Container>
            <Row>
              <Col>
                <StepFour 
                  nextStep={() => nextStep()} 
                  prevStep={prevStep} 
                  handleFormData={userData?.candidateInfo} 
                  cdId={cdId} 
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
      case 5:
      return (
        <div className="App">
          <BlockUI blocking={blocking} />
          <Container>
            <Row>
              <Col>
                <StepFive 
                   nextStep={() => nextStep()} 
                   prevStep={prevStep} 
                   handleFormData={userData?.candidateInfo} 
                   cdId={cdId}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
      case 6:
      return (
        <div className="App">
          <BlockUI blocking={blocking} />
          <Container>
            <Row>
              <Col>
              { !_.isEmpty(userData.candidateInfo) ? <StepSix 
                  nextStep={() => nextStep()} 
                  prevStep={prevStep} 
                  handleFormData={userData?.candidateInfo} 
                  cdId={cdId}
                /> :'' }
              </Col>
            </Row>
          </Container>
        </div>
      );
      // Only formData is passed as prop to show the final value at form submit
    case 7:
      return (
        <div className="App">
          <BlockUI blocking={blocking} />
          <Container>
            <Row>
              <Col>
                { !_.isEmpty(userData.candidateInfo) ? <StepSeven 
                  nextStep={() => nextStep()} 
                  prevStep={prevStep} 
                  handleFormData={userData?.candidateInfo} 
                  cdId={cdId}
                /> :'' }
              </Col>
            </Row>
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return (
        <div className="App">
        </div>
      );
  }
}

export default CandidateMultiStep;