
import { getDatabase, ref, set, get, child, remove , orderByChild, query, equalTo ,onValue} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_RQueBaP_UiR5mVRPVEA1elGAmc1J6a8",
  authDomain: "guestifyapp-34776.firebaseapp.com",
  projectId: "guestifyapp-34776",
  storageBucket: "guestifyapp-34776.appspot.com",
  messagingSenderId: "511962558406",
  appId: "1:511962558406:web:1a9761c968b7e3ddd00cc7"
};

const app = initializeApp(firebaseConfig);


const database =getDatabase(app);


export const auth = getAuth(app);


export const storage = getStorage(app);

//Set or Update Data on Database
export let writeUserData = async (userId,OwnerName,OwnerEmail,ContactNumber,AdhaarNumber,OwnerFullAddress,OwnerState,City,Pincode,NearestPoliceStation,Landmark,NoOfRooms,NoOfBeds,NoOfAccomodation,AirConditioner,SeparateMeter,Refrigeretor,WifiAvailable,ImageUrl,Rent)=>{
    await set(ref(database, 'OwnerInformationTable/' + userId + "&" + AdhaarNumber.toString()), {
      OwnerUserId : userId,
      OwnerName : OwnerName,
      OwnerEmail: OwnerEmail,
      ContactNumber: ContactNumber,
      AdhaarNumber: AdhaarNumber,
      OwnerFullAddress: OwnerFullAddress,
      OwnerState: OwnerState,
      City: City,
      Pincode: Pincode,
      NearestPoliceStation: NearestPoliceStation,
      Landmark: Landmark,
      NoOfRooms: NoOfRooms,
      NoOfBeds: NoOfBeds,
      NoOfAccomodation: NoOfAccomodation,
      AirConditioner:  AirConditioner,
      SeparateMeter: SeparateMeter,
      Refrigeretor: Refrigeretor,
      WifiAvailable: WifiAvailable,
      ImageUrl: ImageUrl,
      Rent: Rent
    }).then(()=>{
        console.log("Data added successfully");
    }).catch((error)=>{
        console.log("Failed with error "+error);
    });
  }


//write Data for feedback
export let writeFeedback = async(adhaar,name,email,feedback)=>{
    await set(ref(database, 'ClientFeedbacks/' + adhaar + "&" + name + "&" + email.replace('.','-')),{
      ClientName : name,
      ClientEmail : email,
      PgAdhaar : adhaar,
      ClientFeedback : feedback
    }).then(()=>{
      console.log("Feedback Added Successfully");
    }).catch((err)=>{
      console.log("Failed with error "+err);
    })
}

 //Remove Data from Database
export let removeData = async(removeItem)=>{
    var b;
    const dataRef = ref(database);
    let del = await remove(child(dataRef,removeItem));
    if(del){
      console.log("Data remove successfuklly");
      b = del;
    };
   return b;
}

//Get Data from Database Based on Adhaar Number(Can be viewed by the owner)
export let getData = async(AdhaarNumber)=>{
    var a;
    const dataRef = ref(database);
    let snapshot =  await get(child(dataRef,'OwnerInformationTable/' + AdhaarNumber));
    if(snapshot.exists()){
            a = snapshot.val();
        }else{
            console.log("Data not exists");
            a = null;
    }
   return a;
}

export let listData =async (userIdentity)=>{
  let value;
  const dataRef = ref(database,'OwnerInformationTable/');
  const idQuery = query(dataRef,orderByChild("OwnerUserId"),equalTo(userIdentity));
  onValue(idQuery,(snapshot)=>{
    if(snapshot.exists()){
      value = snapshot.val();
    }else{
      value = null;
    }
  });
  return value;
}

export let listCard =async (child,val)=>{
  let value;
  const dataRef = ref(database,'OwnerInformationTable/');
  const idQuery = query(dataRef,orderByChild(child),equalTo(val));
  onValue(idQuery,(snapshot)=>{
    if(snapshot.exists()){
      value = snapshot.val();
    }else{
      value = null;
    }
  });
  return value;
}

// list all feedback data for a given adhaar no assigned PG
export let listFeedback =async (adhaar)=>{
  let value;
  const dataRef = ref(database,'ClientFeedbacks/');
  const idQuery = query(dataRef,orderByChild("PgAdhaar"),equalTo(adhaar));
  onValue(idQuery,(snapshot)=>{
    if(snapshot.exists()){
      value = snapshot.val();
    }else{
      value = null;
    }
  });
  return value;
}