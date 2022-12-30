import React, { useState, useEffect, Suspense, useRef } from 'react';
import './home.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-web';
import ArrowRight1 from '../../Lotties/arrow-right.json';
import ArrowRight2 from '../../Lotties/arrow-right.json';
import ArrowRight3 from '../../Lotties/arrow-right.json';
import ArrowRight4 from '../../Lotties/arrow-right.json';
import VidFile from '../../videos/Melvitto edit.mp4';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Panther from '../../components/Panther';
// import { Model } from '../../components/Avatar';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'


function Model(props) {
  const { nodes, materials } = useGLTF('/Avatar.glb')

  const ref = useRef();
  useFrame((state, delta) => {
    // adjust object position
    if (ref.current) {
      ref.current.rotation.x += delta / 2;
      ref.current.rotation.y += delta;
    }
    //console.log(delta);
  });

  return (
    <group {...props} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh ref= {ref} position={[0, 0, 0]} geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Beard" geometry={nodes.Wolf3D_Beard.geometry} material={materials.Wolf3D_Beard} skeleton={nodes.Wolf3D_Beard.skeleton} morphTargetDictionary={nodes.Wolf3D_Beard.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Beard.morphTargetInfluences} />
    </group>
  )
}

useGLTF.preload('/Avatar.glb')


const Home = () => {

    const [showAbout, setShowAbout] = useState(false);
    
    const [showSkills, setShowSkills] = useState(false);

    const [showProjects, setShowProjects] = useState(false);

    const [showContact, setShowContact] = useState(false);

    const [move, setMove] = useState(false);

    const [smallScreen, setSmallScreen] = useState(true);

    const [isHovering, setIsHovering] = useState(false);

    const [loader, setLoader] = useState(false);

    let isDeskTop = window.matchMedia('(max-width: 1024px)');

    let isSmallScreen = window.matchMedia('(max-width: 539px)');

      //console.log(isDeskTop.matches);

    const reportWindowSize = () => {
      //console.log(window.innerWidth);
    }

    window.addEventListener("resize", reportWindowSize);

    isDeskTop.onchange = (e) => {
      if (e.matches) {
        //console.log('This is less than 1024px wide.');
      } else {
        //console.log('This is more than 1024px wide.');
      }
    }

    useEffect(() => {
      
    }, [])


    const skillsBox = {
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          x: !isSmallScreen.matches && [50, -50],
          transition: {
            type: 'spring',
            delayChildren: 0,
            staggerChildren: .1,
            staggerDirection: 1,
            delay: .1,
          }
        }
      }

      const aboutBox = {
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          x: !isSmallScreen.matches && [-15, 15], 
          rotateZ: move? [-.5, .5]: 0,
          transition: {
            type: 'spring',
            delayChildren: 0,
            staggerChildren: .1,
            staggerDirection: 1,
            delay: .1,
          }
        }
      }
    
      const skill = {
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            type: 'spring',
            duration: 1,
          }
        }
      }

      const textVariant = !isDeskTop.matches && smallScreen && {
        hidden: {
          y: 0,
        },
        visible: {
          y: 0,
          transition: {
            type: 'spring',
            delayChildren: 0,
            staggerChildren: .1,
            staggerDirection: 1,
            delay: .1,
          }
        }
      }

      const text = !isDeskTop.matches && smallScreen && {
        hidden: {
          y: 100,
        },
        visible: {
          y: 0,
          transition: {
            type: 'spring',
            duration: 1,
          }
        }
      }


    const handleClickAbout = () => {
        setShowAbout(!showAbout);
        setShowSkills(false);
        setShowProjects(false);
        setShowContact(false);    }

    const handleClickSkills = () => {
        setShowSkills(!showSkills);
        setShowAbout(false);
        setShowProjects(false);
        setShowContact(false);  
    }

   const handleClickProjects = () => {
        setShowProjects(!showProjects);
        setShowAbout(false);
        setShowSkills(false);
        setShowContact(false);  
   }

   const handleClickContact = () => {
        setShowContact(!showContact);  
        setShowProjects(false);
        setShowAbout(false);
        setShowSkills(false);
   }

  useEffect(() => {
      let BodyTextElement = document.getElementById('body-text-id');

    BodyTextElement.addEventListener("mousemove", (e) => {
      //console.log('Mouse just moved!')

      let directionX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
      //let directionY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

      if(directionX < 0) {
        //console.log('Left');
       setMove(true);
      } else {
        //console.log('Right');
        setMove(false);
      }

    })
  }, [])

  useEffect(() => {
    const instance = Lottie.loadAnimation({
        container: document.querySelector("#arrow-right1"),
        animationData: ArrowRight1,
    })

    return () => instance.destroy();
  }, [])

  useEffect(() => {
    const instance = Lottie.loadAnimation({
        container: document.querySelector("#arrow-right2"),
        animationData: ArrowRight2,
    })

    return () => instance.destroy();
  }, [])

  useEffect(() => {
    const instance = Lottie.loadAnimation({
        container: document.querySelector("#arrow-right3"),
        animationData: ArrowRight3,
    })

    return () => instance.destroy();
  }, [])

  useEffect(() => {
    const instance = Lottie.loadAnimation({
        container: document.querySelector("#arrow-right4"),
        animationData: ArrowRight4,
    })

    return () => instance.destroy();
  }, [])


  const [mousePosition, setMousePosition] = useState({x: 1, y: 1});

  const [show, setShow] = useState(false);

  let newPosition;

  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const cursorVariant = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
    }
  }
  //console.log(mousePosition);

  if (mousePosition.x < window.innerWidth/2) {
    let divisor = mousePosition.x/(window.innerWidth/2);
    // console.log(divisor);
    // console.log(mousePosition.x);
    newPosition = (0 - (mousePosition.x/(divisor) - (mousePosition.x*2)));
    // console.log(newPosition);

    if(mousePosition.x === 0) {
      newPosition = (0- (mousePosition.x + 700));
    }
  }

  const [count, setCount] = useState([]);

  const sliderRef = useRef(null);
  const progressRef = useRef(null);

  const arrowRef = useRef(null);
  const arrowRef2 = useRef(null);
  const arrowRef3 = useRef(null);
  const arrowRef4 = useRef(null);

  useEffect(() => {

    let slider = document.getElementById('progressBar');
    let progress = document.getElementById('progress');
  
    let widthBar = sliderRef.current.offsetWidth;
    let widthProgress = progressRef.current.offsetWidth;
  
    let result = Math.round((widthBar/widthProgress));

    console.log(widthBar);
    console.log(widthProgress);
  
    console.log(result);
  
    function moveLoad() {
      setInterval(addFrame, 50);
      function addFrame() {
        if(result < 106) {
          result = result + 1;
          progressRef.current.style.width = result + "%";
          arrowRef.current.style.display='none';
          arrowRef2.current.style.display='none';
          arrowRef3.current.style.display='none';
          arrowRef4.current.style.display='none';
        } else {
          progressRef.current.style.display = 'none';
          sliderRef.current.style.display = 'none';
          setShow(true);
          if (window.innerWidth > 1024) {
            arrowRef.current.style.display='block';
            arrowRef2.current.style.display='block';
            arrowRef3.current.style.display='block';
            arrowRef4.current.style.display='block';
          }
        }
      }
    }
    
    setTimeout(() => {
      moveLoad();
    }) 
  }, [])

  return (
    <>

      {<motion.div className='load-box' id="progressBar" ref={sliderRef}>
        <span className='loader' id="progressBar" ref={progressRef}>

        </span>
      </motion.div>}

      <motion.div
        className='cursor'
        animate="default"
        variants={cursorVariant}

        style={{
          width:  isHovering ? '3rem' : '1.5rem',
          height: isHovering ? '3rem' : '1.5rem',
        }}
      />

    <div className='home' id='width'>

      {show && <div className='background'>
        <Canvas 
        camera={{ position: [2, 0, 12.25], fov: 12 }}
        className='canvas'>
          <ambientLight intensity={1.25} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <Model position={[0.025, -0.9, 0]} rotation-x={mousePosition.y/1000} rotation-y={newPosition ? newPosition/1000 : mousePosition.x/1000} rotation-z={0} />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>}

        <div className='header'>
            <p className='header-text'>Oladipo Samuel</p>

            <p className='header-text'> Fullstack Developer </p>
        </div>

        {<div className='body'>

            {<motion.div
            onClick={handleClickAbout}
            onMouseEnter= {() => {
              setShowAbout(true)
              setShowSkills(false);
              setShowProjects(false);
              setShowContact(false);

              setIsHovering(true);
            }}

            onMouseLeave={() => {
              setIsHovering(false);
            }}
             className='body-text'
             id='body-text-id'
             variants={textVariant}
             initial="hidden"
             whileHover="visible"
             >
              {/* {'>>'} */}
              {<div id='arrow-right1' className='arrow-right'
              ref={arrowRef}
              onClick={() => {
                if(window.innerWidth === 1280) {
                  //console.log('Yes that point!');
                  setSmallScreen(false);
                }
              }}
              />}
              {show && <>
              <motion.p
              variants={text}
              className='body-text'
              >
                A
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                b
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                o
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                u
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                t
              </motion.p>
              </>}

             </motion.div>}
        
            { showAbout && <motion.div 
            variants={aboutBox}
            initial="hidden"
            animate="visible"
            className='details-box'>
                {showAbout && 
                <p className='details-text'>
                    My name is Oladipo Samuel. I'm a fullstack developer with a penchant for solving problems. 
                    I have worked with <Link className='link' to={{ pathname: "//www.solabtechnologies.com" }} target="_blank"
                    onMouseEnter={() => {  
                      setIsHovering(true);
                    }}
        
                    onMouseLeave={() => {
                      setIsHovering(false);
                    }}
                    >Solab Technologies</Link>, developing web applications to solve problems facing organisations and communities.
                    View my <Link className='link' to={{ pathname: `//www.drive.google.com/file/d/1tBaCXmhZByvVomUhT-9gtdLjInXKwg4x/view` }} target="_blank"
                    onMouseEnter={() => {
                      setIsHovering(true);
                    }}
        
                    onMouseLeave={() => {
                      setIsHovering(false);
                    }}
                    >Resume</Link>
                </p>}
            </motion.div>}


            { <motion.div
            onClick={handleClickSkills}
            onMouseEnter={() => {
              setShowSkills(true)
              setShowAbout(false);
              setShowProjects(false);
              setShowContact(false);  
              setIsHovering(true);
            }}

            onMouseLeave={() => {
              setIsHovering(false);
            }}
             className='body-text'
             variants={textVariant}
             initial="hidden"
             whileHover="visible"
             >
              {/* {'>>'} */}

              {<div id='arrow-right2' className='arrow-right'
              ref={arrowRef2}
              onClick={() => {
                if(window.innerWidth === 1280) {
                  //console.log('Yes that point!');
                  setSmallScreen(false);
                }
              }}
              />}

              { show && <>
              <motion.p
              variants={text}
              className='body-text'
              >
                S
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                k
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                i
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                l
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                l
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                s
              </motion.p>
              </>}

             </motion.div>}

            { showSkills && <motion.div 
            variants={skillsBox}
            initial="hidden"
            animate="visible"
            className='details-box'>
                {showSkills && 
                    <>
                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>JavaScript</li>
                    </motion.ul>
            
                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>TypeScript</li>
                    </motion.ul>
            
                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>ReactJS</li>
                    </motion.ul>
            
                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>NodeJS</li>
                    </motion.ul>
            
                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>MongoDB</li>
                    </motion.ul>

                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>Git</li>
                    </motion.ul>

                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>MySQL</li>
                    </motion.ul>

                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>Webflow</li>
                    </motion.ul>

                    <motion.ul
                    variants={skill}
                    className="details-text-small"
                    >
                        <li>SASS</li>
                    </motion.ul>

                    </>
                }
            </motion.div>}

            {<motion.div
            onClick={handleClickProjects}
            onMouseEnter={() => {
              setShowProjects(true);
              setShowSkills(false)
              setShowAbout(false);
              setShowContact(false);  
              setIsHovering(true);
            }}

            onMouseLeave={() => {
              setIsHovering(false);
            }}
             className='body-text'
             variants={textVariant}
             initial="hidden"
             whileHover="visible"
             >
              
              {/* {'>>'} */}

              {<div id='arrow-right3' className='arrow-right'
              ref={arrowRef3}
              onClick={() => {
                if(window.innerWidth === 1280) {
                  //console.log('Yes that point!');
                  setSmallScreen(false);
                }
              }}
              />}
              {show && <>
              <motion.p
              variants={text}
              className='body-text'
              >
                P
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                r
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                o
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                j
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                e
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                c
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                t
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                s
              </motion.p>
              </>}

              </motion.div>}

            { showProjects &&  <motion.div
            variants={skillsBox}
            initial="hidden"
            animate="visible"
             className='details-box'>
                {showProjects && 
                <>
                    <p className='details-text-small-link'>
                    <a className='link' href='https://melvitto.netlify.app' target="_blank"
                    onMouseEnter={() => {  
                      setIsHovering(true);
                    }}
        
                    onMouseLeave={() => {
                      setIsHovering(false);
                    }}
                    >Fan site for artist Melvitto</a>
                    </p>
                    <div className='video-box'>
                        <video autoPlay loop muted width="100%">
                        <source src={VidFile} type="video/mp4"
                        />
                        </video>
                    </div>

                    <p className='details-text-small-link'>
                    <a className='link' href='https://melvitto.netlify.app' target="_blank">Kiira - A smart virtual clinic for women</a>
                    </p>
                    <div className='video-box'>
                        <video autoPlay loop muted width="100%">
                        <source src={VidFile} type="video/mp4"
                        />
                        </video>
                    </div>

                </>
                }
            </motion.div>}

            {<motion.div
             onClick={handleClickContact}
             onMouseEnter={() => {
              setShowContact(true); 
              setShowProjects(false);
              setShowSkills(false)
              setShowAbout(false); 
              setIsHovering(true);
            }}

            onMouseLeave={() => {
              setIsHovering(false);
            }}
             className='body-text'
             variants={textVariant}
             initial="hidden"
             whileHover="visible"
             >
              
              {/* {'>>'} */}

              {<div id='arrow-right4' className='arrow-right'
              ref={arrowRef4}
              onClick={() => {
                if(window.innerWidth === 1280) {
                  //console.log('Yes that point!');
                  setSmallScreen(false);
                }
              }}
              ></div>}

              {show && <>
              <motion.p
              variants={text}
              className='body-text'
              >
                C
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                o
              </motion.p>
              <motion.p
              variants={text}
              className='body-text-small'
              >
                n
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                t
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                a
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                c
              </motion.p>

              <motion.p
              variants={text}
              className='body-text-small'
              >
                t
              </motion.p>
              </>}

              </motion.div>}

            { showContact &&  <motion.div 
             variants={skillsBox}
             initial="hidden"
             animate="visible"
            className='details-box'>
                {showContact && 
                <>
                    <p className='details-text'>
                        Oladiposamuel.ola@gmail.com
                    </p>

                    <Link to={{ pathname: "//www.github.com/Oladiposamuel" }} target="_blank"> <button  className='btn'>Github</button> </Link>
                    <Link to={{ pathname: "//www.twitter.com/Olasammie_" }} target="_blank"> <button  className='btn'>Twitter</button> </Link>
                </>}
            </motion.div>}
        </div>}
    </div>
    </>
  )
}

export default Home