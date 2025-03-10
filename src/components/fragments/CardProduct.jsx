import React, { useEffect, useState } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Image,
  Button,
} from "@heroui/react";
import { getLayananSalon } from "../../services/service";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const CardProduct = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getLayananSalon(setDatas);
  }, []);

  return (
    <>
      <div className="relative px-4 sm:px-8 lg:px-16">
        <Swiper
          slidesPerView={1} // Tampilkan 1 item di layar kecil
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            480: { slidesPerView: 1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 4, spaceBetween: 35 },
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {datas.length > 0 &&
            datas.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <Card className="p-2 shadow-md flex flex-col lg:w-[300px] xl:w-[260px]">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-xs font-semibold uppercase min-h-[40px] line-clamp-2">
                      {item.description}
                    </p>
                    <small className="text-default-500">{item.type}</small>
                    <h3 className="font-bold text-large">{item.name}</h3>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Button
                      className="text-tiny text-white bg-black/20"
                      color="default"
                      radius="lg"
                      size="sm"
                      variant="flat"
                    >
                      Rp {item.harga.toLocaleString()}
                    </Button>
                  </CardBody>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default CardProduct;
