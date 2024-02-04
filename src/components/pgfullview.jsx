import React, { useState, useEffect } from "react";
import "../style/pgfullview.css";
import { storage } from "./accomodation.js";
import { ref, getDownloadURL } from "firebase/storage";
import Pgreview from "./pgreview.jsx";
import { writeFeedback, listFeedback } from "./accomodation.js";
import LocationMap from "./locationmap.jsx";
import Modal from 'react-modal';
const Pgfullview = (props) => {
  const [imgUrl, setimgUrl] = useState("");
  const [feedData, setfeedData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [feedCardData, setfeedCardData] = useState([]);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Adjust the overlay opacity as needed
     backdropFilter: 'blur(5px)', // Adjust the blur amount as needed
    },
  };

  let myobject = {
    add1: props.colAddress,
    add2:
      props.pgObj.OwnerFullAddress +
      ", " +
      props.pgObj.City +
      ", " +
      props.pgObj.OwnerState,
  };

  let name;
  let value;
  let handleFeedChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setfeedData({ ...feedData, [name]: value });
  };

  let submitFeedback = async () => {
    if (
      feedData.name === "" ||
      feedData.email === "" ||
      feedData.feedback === ""
    ) {
      alert("Please fill all fields in your feedback");
    } else {
      let subFeed = window.confirm("Are you want to submit your Feedback?");
      if (subFeed) {
        await writeFeedback(
          props.pgObj.AdhaarNumber,
          feedData.name,
          feedData.email,
          feedData.feedback,
        );
        alert("Feedback Added Successfully");
        gData();
        setfeedData({
          name: "",
          email: "",
          feedback: "",
        });
      }
    }
  };
  let gData = async () => {
    let response = await listFeedback(props.pgObj.AdhaarNumber);
    console.log(response);
    if (response !== null || response !== undefined) {
      setfeedCardData(response);
    } else {
      setfeedCardData(response);
    }
  };

  useEffect(() => {
    let getFeedData = async () => {
      let response = await listFeedback(props.pgObj.AdhaarNumber);
      console.log(response);
      if (response !== null || response !== undefined) {
        setfeedCardData(response);
      } else {
        setfeedCardData(response);
      }
    };

    let getUrlImage = async () => {
      const storageRef = ref(
        storage,
        `${props.pgObj.OwnerUserId}&${props.pgObj.AdhaarNumber}/${props.pgObj.ImageUrl}`,
      );
      let url = await getDownloadURL(storageRef);
      setimgUrl(url);
    };
    getUrlImage();
    getFeedData();
  }, []);

  useEffect(() => {
    console.log(imgUrl);
  }, [imgUrl]);
  useEffect(() => {
    console.log(feedCardData);
  }, [feedCardData]);

  let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.backgroundcolor = "#2D3250";
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  return (
    <>
      <div className="pg-container">
        <div className="pg-img-text">
          <div className="pg-full-img">
            <img
              src={
                imgUrl !== ""
                  ? imgUrl
                  : "https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1580286746/Website/CMS-Uploads/fmbctxc7r2oosciiiaqt.jpg"
              }
              alt=""
            />
          </div>
          <div className="pg-full-desc">
            <h1>About PG</h1>
            <p>
              {props.pgObj.OwnerFullAddress +
                ", near" +
                props.pgObj.Landmark +
                ", " +
                props.pgObj.City +
                ", " +
                props.pgObj.OwnerState}
            </p>
            <p>
              {props.pgObj.City} : {props.pgObj.Pincode}
            </p>
            <h3>₹{props.pgObj.Rent}</h3>
          <button className="btn-book" onClick={openModal}>Book Now</button>
          <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}></h2>
        <button onClick={closeModal} style={{float:"right"}}><i className="fa-solid fa-xmark"></i></button>
       <form action="">
       <label for="name">Your Name:</label>
        <input className="inputs" type="text" id="name" name="name" required/>

        <label for="email">Email:</label>
        <input className="inputs" type="email" id="email" name="email" required/>

        <label for="phone">Phone Number:</label>
        <input className="inputs" type="tel" id="phone" name="phone" required/>

        <label for="date">Select Date:</label>
        <input className="inputs" type="date" id="date" name="date" required/>

        <label for="time">Select Time Slot:</label>
        <select id="time" name="time" required>
            <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
            <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
            <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
        </select>

        <button className="buttons" type="submit">Book Slot</button>
       </form>
        
      </Modal>

          </div>
        </div>
        {/* <GetMap location={props.pgObj.OwnerFullAddress+" kolkata, 700010"}/> */}
        {/* <GetMap location={props.pgObj.OwnerFullAddress.toLowerCase()} name="X-frame-Options"/> */}

        <div className="pg-info">
          <p class="room-info">Owner Name : {props.pgObj.OwnerName}</p>
          <p class="room-info">Email Id : {props.pgObj.OwnerEmail}</p>
          <p class="room-info"> Contact Number : {props.pgObj.ContactNumber}</p>

          <p class="room-info">State : {props.pgObj.OwnerState}</p>
          <p class="room-info">City : {props.pgObj.City}</p>
          <p class="room-info">Pincode : {props.pgObj.Pincode}</p>
          <p class="room-info">Landmark : {props.pgObj.Landmark}</p>
          <p class="room-info">No of Rooms : {props.pgObj.NoOfRooms}</p>
          <p class="room-info">No of Beds : {props.pgObj.NoOfBeds}</p>
          <p class="room-info">
            Air conditioner available : {props.pgObj.AirConditioner}
          </p>
          <p class="room-info">
            Separate Meter installed : {props.pgObj.SeparateMeter}
          </p>
          <p class="room-info">Refrigetor : {props.pgObj.Refrigeretor}</p>
          <p class="room-info">WiFi Available : {props.pgObj.WifiAvailable}</p>
        </div>

        <LocationMap location={myobject} />

        <div className="review-form">
          <h2>Leave your Feedback</h2>
          <div className="review-form-input">
            <input
              type="text"
              name="name"
              value={feedData.name}
              onChange={handleFeedChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="email"
              value={feedData.email}
              onChange={handleFeedChange}
              id=""
              placeholder="email"
            />
          </div>
          <textarea
            placeholder="Your Feedback"
            name="feedback"
            value={feedData.feedback}
            onChange={handleFeedChange}
            id=""
            cols="70"
            rows="10"
          ></textarea>
          <div className="post-show-btn">
            <button type="submit" onClick={submitFeedback}>
              POST
            </button>
            <button onClick={gData}>Show Comments</button>
          </div>
        </div>
        {feedCardData === null || feedCardData === undefined ? (
          <h2 className="feedback-count">0 results found</h2>
        ) : (
          <h2 className="feedback-count">
            {Object.values(feedCardData).length} results found
          </h2>
        )}
        {feedCardData === null || feedCardData === undefined ? (
          <h3>No Comments Found</h3>
        ) : (
          Object.values(feedCardData).map((e) => {
            return <Pgreview obj={e} />;
          })
        )}
      </div>
    </>
  );
};

export default Pgfullview;
