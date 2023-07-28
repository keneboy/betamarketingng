import './App.css?v2.5.1';
import routePath from 'utils/route';
import AdminDashboard from "pages/AdminDashboard"
import { useState, useEffect, useContext, Suspense } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import PrivateRoutes from "components/ProtectedRoutes"
import PrivateRoutesConsultant from "components/ProtectedConsultant"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MainConsult from 'pages/Consultant/MainConsult';
import SideNav from 'components/SideNav';
import AuthContext from "Context/AuthProvider"
import Preloader from 'components/Preloader';


function App() {
  const { privateRoutes, privateRoutesConsultant, publicRoutes } = routePath()
  const location = useLocation();
  const { nactive } = useContext(AuthContext)
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true)
      }
      else {
        setBackToTopButton(false)
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behaviour: "smooth"
    })
  }
  return (
    <>
      {
        nactive && <SideNav />
      }
      <Routes>


        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<AdminDashboard />} >
            {
              privateRoutes.map(({ path, component: Component }, index) => {
                return <Route path={path} key={index} element={<Suspense fallback={<Preloader />}>
                  <Component />
                </Suspense>} />
              })
            }
          </Route>
        </Route>
        <Route element={<PrivateRoutesConsultant />}>
          <Route path="/dashboardConsult" element={<MainConsult />}>
            {
              privateRoutesConsultant.map(({ path, component: Component }, index) => {
                return <Route path={path} key={index} element={<Suspense fallback={<Preloader />}>
                  <Component />
                </Suspense>} />
              })
            }
          </Route>
        </Route>

        {
          publicRoutes.map(({ path, component: Component }, index) => {
            return <Route path={path} key={index} element={<Suspense fallback={<Preloader />}>
              <Component />
            </Suspense>} />
          })
        }

      </Routes>
      {
        location?.pathname === "/dashboard" && <button onClick={scrollUp} className={backToTopButton ? "button activate " : "button"} >
          <KeyboardArrowUpIcon className="icon" />
        </button>
      }

      {
        location?.pathname === "/dashboard" && <a href="https://wa.me/+2348149229891" target="_blank" rel="noreferrer" className="whatsapp">
          <img src="/image/whatsapp.png" alt="" />
        </a>
      }

    </>
  );
}

export default App;
