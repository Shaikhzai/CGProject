import {motion, AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';

import state from '../store';
import { CustomButton } from '../components';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from '../config/motion';

const Home = () => {
    //to use default values for shirt from store folder
    const snap= useSnapshot(state);

  return (
    //checking if on intro page
    <AnimatePresence>
      {snap.intro && (
        //if on intro/homepage then animate
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation("down")}>
            <img
              src='./threejs.png'
              alt='logo'
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden"/> DO IT.
              </h1>
            </motion.div>

            <motion.div {...headContentAnimation} className="flex flex-col gap-5">
              <p className="max-w-md font-normal text-gray-600">
                Create your unique and exclusive shirt with this 3D customization tool by <a href='https://linktr.ee/voidzai' target='_blank'><i>Shaikh Mohammed Zaid </i><b>1KN21CS095</b></a> and <i>Shaukath Taufiq Aali</i> <b>1KN22CS405</b>. Unleash your imaginations{" "} and define your own style.
              </p>

              {/* coustom button for login */}
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={()=> state.intro= false }
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />

            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home