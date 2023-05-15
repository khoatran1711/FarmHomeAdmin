import "./farmer-page.style.scss";
import { TableRow } from "../components/table-row";
import { TextInput } from "../components";
import { MenuBar } from "../components/menu-bar";
import { Button } from "@mui/material";
import { TableRowTitle } from "../../constants/table-row.constant";
import { PageRoute } from "../../constants";
import { useEffect, useState } from "react";
import { I18n } from "../../translation";
import { FarmerService } from "../../services/farmer.service";
import { User } from "../../models/merchant.model";
import { globalNavigate } from "../../utilities/navigation.utilities";

const header = [
  {
    title: TableRowTitle.ID,
  },
  {
    title: TableRowTitle.avatar,
  },
  {
    title: TableRowTitle.name,
  },
  {
    title: TableRowTitle.phone,
  },
  {
    title: TableRowTitle.mail,
  },
];

export const FarmerPage = () => {
  const farmerService = new FarmerService();

  const [username, setUsername] = useState<string>("");
  const [body, setBody] = useState<[]>([]);

  const onRowClick = (rowIndex: number) => {
    globalNavigate(PageRoute.FarmerDetailPage, body[rowIndex]);
  };

  const convertData = async (contents: User[] | []) => {
    if (contents?.length === 0) {
      setBody([]);
      return;
    }
    const body: any = [];
    contents.map((item, index) => {
      const bodyrow = [
        {
          content: item?.id?.toString(),
        },
        {
          imageUrl: item?.avatar,
        },
        {
          content: item?.lastName + " " + item?.firstName,
        },
        {
          content: item?.phone,
        },
        {
          content: item?.email,
        },
      ];
      body.push({ bodyRow: bodyrow }); //Delete 2 below lines when have more farmer
      body.push({ bodyRow: bodyrow });
      body.push({ bodyRow: bodyrow });
    });
    setBody(body);
  };

  const search = async () => {
    const response = await farmerService.searchFarmer(username);
    const responseData = response?.data;

    convertData(responseData?.contents);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event?.key === "Enter") {
      search();
    }
  };

  const getData = async () => {
    const response = await farmerService.getAllFarmer();
    const responseData = response?.data;
    convertData(responseData?.contents);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="farmer-page">
      <div className="page-container">
        <section className="left-content">
          <div className="label">{I18n.FARMHOME}</div>
          <MenuBar />
        </section>
        <div className="search-bar">
          <TextInput
            label={I18n.farmers}
            onChangeText={(e) => setUsername(e?.target?.value)}
            onKeyDown={(e) => handleEnter(e)}
          />
          <Button onClick={() => search()}>search</Button>
          {body?.length > 0 && (
            <TableRow header={header} body={body} onClick={onRowClick} />
          )}
        </div>
      </div>
    </div>
  );
};
