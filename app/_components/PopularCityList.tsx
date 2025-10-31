"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Popular Destinations to Visit
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

// update the data for destinations
const data = [
  {
    category: "Historical Monument",
    title: "Taj Mahal, Agra",
    src: "https://places.googleapis.com/v1/places/ChIJbf8C1yFxdDkR3n12P4DkKt0/photos/AWn5SU6Spb3-y7-Z3GXKOClg-Z4SweUL59ZqIZ44MNzJcSHc_i2qA1wI0SfqouGv2EqCXnv_IpKrO_RAbaeCjJRGqg2nP2y4Drd307UIPRb4jbupVkB3CA_UYpEziqmXgixKywl5dZCDZNXNProwlb5Kw4lHauMn_4uv08YYeKR_68r3gKEGOIw5UtTsveDOL5WpGJhBdJIa1YFimB8kgo-ET2bFPKO8TXMKLMzbqHxz8ONs0pMg2at1wo_xhOJL6yE9VdCLTHKRovGx9TfwMPOTkfpK83_pJzUB88vz98PGJ9oKhi0YK5pwM6hJE6AZkoyVXYXnzEw4-jWk2d3JY1PE9wuIrmgYmkLTPkTG0X27yhxLHSCEeAJ_WjHqXtw78kxd0WoseuTBsQNw3CMdpmhV9lxqRLbO_tj6bhu43sFDSFfd8A/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBcTXM6PTaIlaG7kbbTrHrrSTNmMcCYq-s",
    content: <DummyContent />,
  },
  {
    category: "Coastal City",
    title: "Goa Beaches",
    src: "https://places.googleapis.com/v1/places/ChIJn5OqQp7BvzsR7YB4KherD64/photos/AWn5SU4vx2yWapBiB4VMBcPvb5slhY6hBySz4QqYFUo31MaGKhriatECbQwvAfIDdnjZp47nrbFVkYVQWACJ6iESjKww7E4Ad13e6104SbMc7RLkGH5FU-aZG-8U0mutTfPhskkCpOWts5XvcysJRCoG3nZXzThQ5uBYC9bS31L9j0_TItNA5II9OzIufT0cy1pf1sWhmFknrT2iT8nGs1XmGhcK1okcQ8ZSXf-SrA9iHrbySNKFVypBmbj6dkpV_-AWKZup-Kz0W57CyE8P8zQXOdvlAQiW0OlJhdggnv8bFN9WQMqxlwqO1eZvJ2sMRPjXjTZdGC4wCmvbjqOlmQchrh7v7iI80ACMzfiKdox3uOPFn7-pTTatm08whrUx800XlnI31mjcbiyyRtBrDebR2LQhmWoJq9XNJF28iLMGlzwy_Q/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBcTXM6PTaIlaG7kbbTrHrrSTNmMcCYq-s",
    content: <DummyContent />,
  },
  {
    category: "Desert Destination",
    title: "Jaisalmer Fort, Rajasthan",
    src: "https://places.googleapis.com/v1/places/ChIJ7XFhiCK9RzkRcxk-ksQHpdQ/photos/AWn5SU4Tx7Pl3QrHSlqOoasrhQuQ1SVsl_FKQIHe_KkpZ4EmKm_OGq0a72URHvynwzg9FpO2GrbtYnumdnjiWX9GKN-F_6NPNF_dWQsPK_Punl6GYYx6jmqlWD8uc7ScP9E_66Zx8PyVsHINfY971Fk7tz7jOKH12aaw0Jp_vIQgPuzjrw2Z-uSsmesJaZvXUYzRj07phFPAUUUuHl-2qsmQk95A40v9w3o-0fxsD--rrOq9K9t0te7A-sKT96Si4J-iyBhPDwn7_n8fvgPTFNJhiijkwl8beUgm_3__M3c5zJPYBwRVHkJ9SYmuq-i028hgK74_coCCVDlpTxAqMp-cb6KU9jbwM_Z9tJc6YwmXtrP7iWA8Ln5o6t2aL7oW1IBXbQ1wYpDtTJniLk_4eHYHk2LuzhzfuCqmCul5VVk_HMoDI1R_/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBcTXM6PTaIlaG7kbbTrHrrSTNmMcCYq-s",
    content: <DummyContent />,
  },
  {
    category: "Natural Wonder",
    title: "Backwaters of Kerala",
    src: "https://places.googleapis.com/v1/places/ChIJvwe3yg6ECDsRk6vGQJxg0Y4/photos/AWn5SU5DOuR3RkfzeP1FQFLJKJpetTZsZOsXkaYKQFDYAolwnM9PkxDSy9SgiGEQ8R2TpAav2MWj70DSGEJkuZFPtywfLDmc7WsR_PMQk9q8RAldpefLGkZX5ajEohaDfmDfDqhKEftifylNAo6GMLQDhBukQ-2sNKVvSTTpuiW7_BfsOnm3bHE_lFxanrv2VoT0heC5lGHxRVNIIdgoXLBHnw8U9R5jXL3RAs7H1fbXBAPdx-kh7Nvcc1FSEeDjtJznphABsb9Tl3yodmgboBzVMCTwhcUSpSmxUaWm0vBhyb_CSp2DM8riNaTrTfEdCGBgDWt6weNiEfHvckT7vs_xEFa5LHl8t8vwwAbTEgLGE_I9C_ii6sxKR8YeL2VLjzvh073AvPUKzWAtCOj4cCehEjiuQpA4VENHymhk8lcECvo/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBcTXM6PTaIlaG7kbbTrHrrSTNmMcCYq-s",
    content: <DummyContent />,
  },
  {
    category: "Hill Station",
    title: "Manali, Himachal Pradesh",
    src: "https://places.googleapis.com/v1/places/ChIJP9A_FgiHBDkRzXZQvg6oKYE/photos/AWn5SU6jdeCOp8aFbO9LRs1kDNXyzFm4-zEgE1Ep3puLjKPPQPCXj86GA3knk1vEY0vy5fvvxA3lF2HcX1XPTPo1uoRkOgybg492saq8i5EUoxIvsoIK1XgNxFA4cVw8MQuuAORd6pxvDeASoPBwha-8KcHNGqr7im3GHlHYFVqolNJoMc85KPSQ9yH1S-kObA_0taRV2zUTPShs7wEdbPaSNRj7jqt33MIYUeLbopUR5IGfMxRdZgRoA-tfSngW6Jhd25D6RFFRYbNRs0ywGOBQ_75V_YTCtb-p6V0HNhUPam5w96q5ZO5UYLoofTS1ZFm8CuUSiKxsoxsI_s5r0UESNn-OmitovtiPtDiHFW14-U69IyZuYw--by_fNAj8tFH7rSSdsbmyJUvNdsSy3r2mEYuAdg01G7Nj0Li_E50BcaVcmg/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBcTXM6PTaIlaG7kbbTrHrrSTNmMcCYq-s",
    content: <DummyContent />,
  },
  {
    category: "Spiritual Center",
    title: "Varanasi Ghats, Uttar Pradesh",
    src: "https://places.googleapis.com/v1/places/ChIJZx9BBB4ujjkRPMgcoTbvGqY/photos/AWn5SU5KNTICgJJO7EIh6YuYV4qpIt1E0UQg-ZVelGrwhYcKQaYu1F566UxNL57rvNLQtalxro47kwRwGU_i6Ebg8m3egXaPs_noO3GjE9K5QJVFIc8QTchJgVa4-8yRIgOhAfL7v7omTxuGyDAE6mdTzqlAWe8DxRo5pvEc6ylNTAWs-WXedDHZGv7rh11Rukb6Cy-sLbKT8XTz4pgbdt-3RPCDgs-GwQs2f5q25FVwocaMsg8cS5UutsflRAXbvwguG1hcD2MH55a1wBcMOR5lHze2nRIzei7Rs4nA-O1QDBVidrLbPF2SSK5Oq-ZBFKrcUIIz7swlb29776g7QuGoU9gJqUZlGKLYrXCVZ9lK-n-qgODloi21rpO2VAL95JTLa9oo8bSpn1C5hiX1kMTL0Wc_dK8y6_10xrvnkpenHE412A/media?maxHeightPx=1000&maxWidthPx=1000&key=AIzaSyBcTXM6PTaIlaG7kbbTrHrrSTNmMcCYq-s",
    content: <DummyContent />,
  },
];
