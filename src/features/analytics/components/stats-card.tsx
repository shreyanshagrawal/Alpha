import { memo, ReactNode } from "react";

import { motion } from "framer-motion";

interface Props {
  title: string;

  value: string | number;

  icon?: ReactNode;
}

 function StatsCard({ title, value, icon }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="dashboard-card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>

        {icon}
      </div>
    </motion.div>
  );
}
export default memo(StatsCard);