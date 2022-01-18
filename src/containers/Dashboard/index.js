import React, { useEffect,useState } from "react"
import { useDispatch,useSelector } from 'react-redux'
import { Card } from "react-bootstrap";
import { fetchDashboardResume,fetchDashboardReset } from '../../actions/Dashboard'

const Dashboard = (props) => {
  /**fetched data from redux store */
    let [callData, setCallData] = useState(true);
    const dashboardData = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    useEffect(() => {
      if(callData){
       dispatch(fetchDashboardResume());
       setCallData(false)
     }
      return () => {
          dispatch(fetchDashboardReset());
      }
     },[callData]);
  
    
  const { weeklyList,monthlyList,totalList } = dashboardData;
  return (
    <> 
      <div className="row">
          {/* <h1 style={{padding: 35, textAlign:'center'}}>Coming Soon...</h1> */}
         <div className="col-md-4 col-12 col-sm-12">
          <Card
            bg={"primary"}
            text={"white"}
          >
            <Card.Header>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-window-dock" viewBox="0 0 16 16">
               <path d="M3.5 11a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm4.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
               <path d="M14 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h12ZM2 14h12a1 1 0 0 0 1-1V5H1v8a1 1 0 0 0 1 1ZM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2Z"/>
            </svg>
            </Card.Header>
            <Card.Body style={{textAlign: "center"}}>
              <Card.Title><h1>All Resumes</h1></Card.Title>
              <Card.Text>
                 <h2>{totalList}</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 col-12 col-sm-12">
          <Card
            bg={"success"}
            text={"white"}
          >
            <Card.Header>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-month" viewBox="0 0 16 16">
                            <path d="M2.56 11.332 3.1 9.73h1.984l.54 1.602h.718L4.444 6h-.696L1.85 11.332h.71zm1.544-4.527L4.9 9.18H3.284l.8-2.375h.02zm5.746.422h-.676V9.77c0 .652-.414 1.023-1.004 1.023-.539 0-.98-.246-.98-1.012V7.227h-.676v2.746c0 .941.606 1.425 1.453 1.425.656 0 1.043-.28 1.188-.605h.027v.539h.668V7.227zm2.258 5.046c-.563 0-.91-.304-.985-.636h-.687c.094.683.625 1.199 1.668 1.199.93 0 1.746-.527 1.746-1.578V7.227h-.649v.578h-.019c-.191-.348-.637-.64-1.195-.64-.965 0-1.64.679-1.64 1.886v.34c0 1.23.683 1.902 1.64 1.902.558 0 1.008-.293 1.172-.648h.02v.605c0 .645-.423 1.023-1.071 1.023zm.008-4.53c.648 0 1.062.527 1.062 1.359v.253c0 .848-.39 1.364-1.062 1.364-.692 0-1.098-.512-1.098-1.364v-.253c0-.868.406-1.36 1.098-1.36z"/>
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
            </Card.Header>
            <Card.Body style={{textAlign: "center"}}>
              <Card.Title><h1>Monthly</h1> </Card.Title>
              <Card.Text>
              <h2>{monthlyList}</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 col-12 col-sm-12">
          <Card
            bg={"secondary"}
            text={"white"}
          >
             <Card.Header>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3-week" viewBox="0 0 16 16">
                       <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
                       <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2-3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
              </Card.Header>
            <Card.Body style={{textAlign: "center"}}>
              <Card.Title><h1>Weekly</h1> </Card.Title>
              <Card.Text>
              <h2>{weeklyList}</h2>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
