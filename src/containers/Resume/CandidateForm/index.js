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

function CandidateMultiStep() {

  
  //state for steps
  const [step, setstep] = useState(1);
  const cdIdData = JSON.parse(localStorage.getItem("data"));
  const [filData,setFilData] = useState()
  const [isData,setIsData] = useState(false)
  const cdId =cdIdData.id;
  const dispatch = useDispatch(); 

  useEffect(() => {
    return () => {
      dispatch(fetchCandidateData(cdId));
    }

  }, []);
  const userData = useSelector( (state) => {  return state.candidate});
  const { candidateInfo, blocking } = userData;
  // console.log('candidateInfo',candidateInfo,isData);
  if(!_.isEmpty(candidateInfo && isData === false)){
    
     setIsData(true) 
      setFilData(candidateInfo)
      // console.log('candidateInfo1',candidateInfo,isData);
    
    // setTimeout(function(){  }, 200);
  }

  



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

console.log('filData',filData);

// javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col>
                <StepOne nextStep={() => nextStep()} handleFormData={filData} dataName={filData ? filData.name : ""} cdId={cdId} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 12 }}>
                <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={filData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
      case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col>
                <StepThree 
                   nextStep={() => nextStep()} 
                   prevStep={prevStep} 
                   handleFormData={handleInputData} 
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
          <Container>
            <Row>
              <Col>
                <StepFour 
                  nextStep={() => nextStep()} 
                  prevStep={prevStep} 
                  handleFormData={handleInputData} 
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
          <Container>
            <Row>
              <Col>
                <StepFive 
                   nextStep={() => nextStep()} 
                   prevStep={prevStep} 
                   handleFormData={handleInputData} 
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
          <Container>
            <Row>
              <Col>
                <StepSix
                   nextStep={() => nextStep()} 
                   prevStep={prevStep} 
                   handleFormData={handleInputData} 
                   cdId={cdId}
                />
              </Col>
            </Row>
          </Container>
        </div>
      );
      // Only formData is passed as prop to show the final value at form submit
    case 7:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col>
                <StepSeven 
                   nextStep={() => nextStep()} 
                   prevStep={prevStep} 
                   handleFormData={handleInputData} 
                   cdId={cdId}
                />
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