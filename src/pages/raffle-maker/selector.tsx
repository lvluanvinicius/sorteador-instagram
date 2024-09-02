import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Text,
  useTheme,
} from "@chakra-ui/react";
import { Funnel, InstagramLogo } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Selector() {
  const theme = useTheme();
  const router = useRouter();

  const sortList = [
    {
      id: 1,
      title: (
        <Text fontSize="2xl" fontWeight="bold">
          Simples
        </Text>
      ),
      icon: <Funnel size={40} />,
      path: `${router.pathname}/simple`,
    },
    {
      id: 2,
      title: (
        <Text
          bgClip={"text"}
          bgGradient={theme.colors.gradients.instagram}
          fontSize="2xl"
          fontWeight="bold"
        >
          Instagram
        </Text>
      ),
      icon: <InstagramLogo size={40} />,
      path: `${router.pathname}/instagram`,
    },
  ];

  return (
    <div className="w-screen flex items-center justify-center">
      <div className="w-full max-w-[95vw] md:max-w-[90vw] py-4">
        <div className="grid xl:grid-cols-6 md:grid-cols-3 mt-4 gap-4">
          {sortList.map((sort) => {
            return (
              <Link href={sort.path} key={sort.id}>
                <Card>
                  <CardHeader className="flex items-center gap-2">
                    {sort.icon} {sort.title}
                  </CardHeader>
                  <CardBody className="flex items-center justify-around">
                    <Button className="w-full">Começar</Button>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
