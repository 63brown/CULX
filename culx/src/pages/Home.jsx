import Pop from "../components/Pop";
import Veggie from "../components/Veggie";
import { motion } from "framer-motion";

function Home() {
  return (
    <motion.div>
      <Pop />
      <Veggie />
    </motion.div>
  )
}

export default Home;
