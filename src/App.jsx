import { BrowserRouter, Routes, Route } from "react-router-dom";
import PetForm from "./component/PetOwnerMaster/PetForm";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/navbar";
import "./index.css";
import Home from "./component/home";
import DogHistory from "./component/PetOwnerMaster/DogHistory";
import InventoryForm from "./component/Inventory/inventoryForm";
import InventoryList from "./component/Inventory/inventoryList";
import EditInventory from "./component/Inventory/EditInventory";
import BreedManagement from "./component/PetOwnerMaster/BreedManagement";
import SalesSection from "./component/salesSection";
import Reminders from "./component/Reminders/Reminders";
import Attendance from "./component/Reminders/Attendance";
import AlertList from "./component/Inventory/AlertList";
import PetByDate from "./component/SalesSection/PetByDate";
import UserLoginPage from "./pages/UserLogin";
import CheckAuth from "./component/CheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SalesHistory from "./component/SalesSection/SalesHistory";
import NewReminders from "./component/Reminders/NewReminders";
import Inquiry from "./component/SalesSection/VisitPurpose/Inquiry";
import Veterinary from "./component/SalesSection/VisitPurpose/Veterinary";
import Hostel from "./component/SalesSection/VisitPurpose/Hostel";
import NewVisitForm from "./component/SalesSection/NewVisitForm";
import Deboard from "./component/Deboard"
import BuySubscription from "./component/SalesSection/VisitPurpose/BuySubscription";
import NewVisitForm2 from "./component/SalesSection/NewVisitForm2";
import AboutUs from "./pages/AboutPage";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsAndCondition";
import RefundPolicy from "./pages/RefundPolicy";
import Footer from "./HomepageComponent/Footer";
import CustomerDashboard from "./CustomerComponent/CustomerDashboard"
import CustomerSignupPage from "./pages/Signup";
import CustomerService from "./CustomerComponent/Services/ServicePage"
import AppointmentBooking from "./CustomerComponent/Appointment/BookingForm";
import AppointmentsPage from "./CustomerComponent/Appointment/AppointmentPage";
import StaffAppointmentsPage from "./component/OnlineCustomerAppointment";
import BuySubcriptionCustomer from './CustomerComponent/subscription/BuySubscription'
import CustomerPetForm from './CustomerComponent/CustomerPetRegistration'
import CustomerSubcription from './CustomerComponent/subscription/SubcriptionsAvailable'
import ShippingPolicy from "./pages/Shippinganddelivery";


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
 
  return (
    <div className="w-screen overflow-x-hidden">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<CheckAuth isAuthenticated={isAuthenticated} />}>
            <Route path="/history" element={<DogHistory />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pet" element={<PetForm />} />
            <Route path="/inventory" element={<InventoryForm />} />
            <Route path="/inventoryList" element={<InventoryList />} />
 
            <Route path="/editinventory" element={<EditInventory />} />
            <Route path="/alertlist" element={<AlertList />} />
            <Route path="/BreedManagement" element={<BreedManagement />} />
 
            <Route path="/salesSection" element={<SalesSection />} />
            <Route path="/saleshistory" element={<SalesHistory />} />
            <Route path="/reminders" element={<NewReminders/>} />
            {/* <Route path="/new" element={<NewReminders />} /> */}
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/petByDate" element={<PetByDate />} />
            <Route path="/fill" element={<Hostel />} />
            <Route path="/nvisit" element={<NewVisitForm/>}/>
            <Route path="/buysubscription" element={<BuySubscription/>}/>
            <Route path="/deboard" element={<Deboard />} />
            <Route path="/nvisit2" element={<NewVisitForm2/>}/>
            <Route path="/onlinecustomerappointment" element={<StaffAppointmentsPage/>} />
            
            <Route path="/customerdaashboard" element={<CustomerDashboard />} />
            <Route path="/customerservice" element={<CustomerService />} />
            <Route path="/bookappointment" element={<AppointmentBooking />} />
            <Route path="/seeappointment" element={<AppointmentsPage />} />
            <Route path="/customerbuysubscription" element={<BuySubcriptionCustomer/>} />
             <Route path="/customerpetform" element={<CustomerPetForm />} />
               <Route path="/customersubscription" element={<CustomerSubcription />} />

          </Route>
 
          <Route element={<CheckAuth isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<UserLoginPage />} />

          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<CustomerSignupPage/>}/>
      
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/refundpolicy" element={<RefundPolicy />} />
            <Route path="/termsandcondition" element={<TermsConditions />} />
              <Route path="/shippingpolicy" element={<ShippingPolicy />} />

        </Routes>
     
      </BrowserRouter>
    </div>
  );
}
 
export default App;