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

const CardProduct = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getLayananSalon(setDatas);
  }, []);

  console.log("State Datas:", datas);
  return (
    <>
      {datas.length > 0 ? (
        datas.map((item, index) => (
          <Card className="p-2 shadow-md flex flex-col">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">
                {item.description}
              </p>
              <small className="text-default-500">{item.type}</small>
              <h4 className="font-bold text-large">{item.name}</h4>
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
        ))
      ) : (
        <p className="text-center text-gray-600">Data tidak ada boss...</p>
      )}
    </>
  );
};

export default CardProduct;
