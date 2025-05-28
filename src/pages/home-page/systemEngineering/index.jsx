import React, { useState, useEffect } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import bgImg from '../../../assets/images/CustomerEngineeringBg.png'
import { useNavigate, useLocation } from "react-router-dom";
const buttons = [
  {
    id: "VESM001",
    oppName: "Early Access Acceleration",
    btnclass: "btn01",
    desc: [
      { points: "Opportunity to take advantage of the early access dates." },
      { points: "Allocation of risk of early access." },
      { points: "Provision of access within Station Boxes for Flash Butt Welding." },
      { points: "Enable Long Welded Rail Distribution ahead of Station access." },
      { points: "Crows Nest example – Best for Project outcome." }
    ],
    price: "~$10,000,000"
  },
  {
    id: "VESM002",
    oppName: "Various SMF Changes",
    btnclass: "btn02",
    desc: [
      { points: "Combine the cycle paths and pedestrian walkways" },
      { points: "Pits and culverts, no monitoring sensors" },
      { points: "Bollard lighting rather than large hinged poles" },
      { points: "Bird and Vermin management strategy, cost-effective controls" },
      { points: "Internal green wall removal" },
      { points: "The removal of compressed air" },
      { points: "Reduced hot water points around the stabling yard" },
      { points: "The provision of tools by the operator" },
    ],
    price: "~$10,000,000"
  },
  {
    id: "VESM003",
    oppName: "Building Optimisation at SMF",
    btnclass: "btn03",
    desc: [
      { points: "Combining Administration functional staff from the Administration building with the administrative staff from the Maintenance Building. Resulting in a separate standalone OCC building combined Administration Staff." },
    ],
    price: "~$12,000,000"
  },
  {
    id: "VESM005",
    oppName: "High Voltage Network changes at SMF",
    btnclass: "btn05",
    desc: [
      { points: "Reticulate 11kV instead of 33kV around SMF precinct." },
      { points: "Optimising specialist equipment supply." },
      { points: "Removal of excess high voltage transformers servicing combined and removed facilities." },
    ],
    price: "~$1,500,000"
  },
  {
    id: "VESM007",
    oppName: "Trackform Optimisation",
    btnclass: "btn07",
    desc: [
      { points: "Alternative trackform types that are simpler to construct in the tunnel than Type 2A." },
      { points: "Type 3A from a buildability and maintenance perspective compared to the system utilised on CSW-LW Package." },
    ],
    price: "~$30,000,000"
  },
  {
    id: "VESM009",
    oppName: "Early Access Acceleration",
    btnclass: "btn09",
    desc: [
      { points: "Opportunity to take advantage of the early access dates." },
      { points: "Allocation of risk of early access." },
      { points: "Provision of access within Station Boxes for Flash Butt Welding." },
      { points: "Enable Long Welded Rail Distribution ahead of Station access." },
      { points: "Crows Nest example – Best for Project outcome." },
    ],
    price: "~$15,000,000"
  },
  {
    id: "VESM010",
    oppName: "Standardised Plantroom Design",
    btnclass: "btn10",
    desc: [
      { points: "Create standardised plantroom design applicable to every station." },
      { points: "Minimise design costs with staged engagements." },
      { points: "Certified standardised designs for modularisation." },
    ],
    price: "~$20,000,000"
  },
  {
    id: "VESM011",
    oppName: "100 Year Design Life",
    btnclass: "btn11",
    desc: [
      { points: "Advocate reducing the 120-year design life to the established design standards of 100 years." },
      { points: "The relevant Australian Standards stop at a 100-year design life." },
    ],
    price: "~$5,000,000"
  },
  {
    id: "VESM012",
    oppName: "Trackway Exhaust System reduce Number of Fans",
    btnclass: "btn12",
    desc: [
      { points: "Optimise the Trackway Exhaust System by reducing the overall number of fans." },
      { points: "Drop-in prefabricated riser modules to service facility." },
      { points: "Provision of modular connections for cable terminations." },
      { points: "Replace MCC with switches." },
    ],
    price: "~$35,000,000"
  },
  {
    id: "VESM019",
    oppName: "Drainage Rising Main",
    btnclass: "btn19",
    desc: [
      { points: "A simplified drainage rising main arrangement." },
    ],
    price: "~$19,000,000"
  },
];

const SystemEngineering = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1200); // Check for mobile view
      const navigate = useNavigate();
  // Update isMobileView on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <section className='customerEngineer'>
       <button
            className="backButton absolute min-[1500px]:left-[20px] min-[1500px]:top-[20px] left-2 top-2 z-10 min-[1680px]:w-[45px] w-[30px]"
            onClick={() => navigate("/home", { state: { returnToSlide: fromSlideIndex } })}
          >
            <img src="https://cpb-uglsolution-videos.s3-accelerate.amazonaws.com/crossBlack.png" alt="" className="w-full" />
          </button>
      <div className="container flex flex-col h-full">
        <div className="customerEngineerInner">
          <div className="flex min-[1680px]:gap-4 gap-3 xl:flex-col min-[1680px]:mt-6 md:mt-4 flex-wrap">
            {buttons.map((button) => (
              <Link
                key={button.id}
                className={`bg-[#44817D] uppercase text-white w-fit cursor-pointer font-semibold min-[1370px]:text-[16px] md:text-[14px] text-[12px] min-[1370px]:h-[40px] md:h-[35px] h-[30px] min-[1370px]:px-5 px-4 flex justify-center items-center rounded-[25px] ${button.btnclass}`}
                onMouseEnter={() => !isMobileView && setActiveButton(button.id)} // Hover for non-mobile
                onMouseLeave={() => !isMobileView && setActiveButton(null)} // Remove hover for non-mobile
                onClick={() => isMobileView && setActiveButton(button.id)} // Click for mobile
              >
                {button.id}
              </Link>
            ))}
          </div>
          <div className="w-full max-[575px]:overflow-x-auto">
            <table className="border-collapse md:w-full h-fit w-[130vw]">
              <thead>
                <tr>
                  <th className="border-r-[1px] border-white px-2 py-1 bg-[#44817D] md:text-[15px] text-[12px] leading-tight text-white   text-start">Opportunity Name</th>
                  <th className="border-r-[1px] border-white px-2 py-1 bg-[#44817D] md:text-[15px] text-[12px] leading-tight text-white  text-start">Description</th>
                  <th className="border-r-[1px] border-white px-2 py-1 bg-[#4FBFAF] md:text-[15px] text-[12px] leading-tight text-white  text-start">Price Benefit - First Pass Approximate</th>
                </tr>
              </thead>
              <tbody>
                {buttons.map((button) => (
                  <tr
                    key={button.id}
                    className={`${activeButton === button.id ? "table-row transition-all duration-300" : "hidden"
                      }`}
                  >
                    <td className="px-2"><p className='font-bold min-[1680px]:text-[24px] min-[1370px]:text-[18px] text-[16px] leading-none bg-[#F9F9F9] p-1 sf'>{button.oppName}</p></td>
                    <td className="px-2 bg-[#F9F9F9]">
                      <ul className="list-disc ps-6 pb-3">
                        {button.desc.map((des, index) => (
                          <li className=' text-black font-bold sf min-[1680px]:text-[20px] min-[1370px]:text-[18px] text-[16px]' key={index}>{des.points}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-2">
                      <Link className='cursor-pointer bg-[#DCF2EF] border-2 border-[#4FBFAF] w-[90%] mx-auto md:h-[45px] h-[35px] flex justify-center items-center rounded-[35px] xl:text-[20px] md:text-[16px] text-[12px] text-[#4FBFAF]'>{button.price}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        <div className="xl:hidden">
          <img src={bgImg} alt="" />
        </div>
        <div className="xl:mt-auto mb-3">
          <p className='text-[#44817D] min-[1680px]:text-[32px] min-[1370px]:text-[20px] text-[16px] leading-normal font-bold sf bg-white w-fit px-[10px]'>10 Value Enhancements Opportunities have been approved Valued at: </p>
          <h2 className='text-[#44817D] min-[1680px]:text-[40px] min-[1370px]:text-[26px] text-[20px] leading-normal font-bold sf bg-white w-fit px-[10px]'>$157,500,000</h2>
        </div>
      </div>
    </section>
  )
}

export default SystemEngineering
