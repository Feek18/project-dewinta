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
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 14 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {datas.length > 0 &&
            datas.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <Card className="p-2 shadow-md flex flex-col w-[300px]">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-xs font-semibold uppercase min-h-[40px] line-clamp-2">
                      {item.description}
                    </p>
                    <small className="text-default-500">{item.type}</small>
                    <h3 className="font-bold text-large">{item.name}</h3>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="object-cover w-full h-40 rounded-xl"
                      src="https://heroui.com/images/hero-card-complete.jpeg"
                      width={270}
                    />
                  </CardBody>
                  <CardFooter className="justify-between overflow-hidden py-1 absolute bottom-[135px] right-2 before:rounded-xl rounded-large w-[calc(100%_-_8px)] z-10">
                    <Button
                      className="text-tiny text-white bg-black/20"
                      color="default"
                      radius="lg"
                      size="sm"
                      variant="flat"
                    >
                      $ {item.harga}
                    </Button>
                  </CardFooter>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default CardProduct;
