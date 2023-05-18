import { TableRow } from "../components/table-row";
import "./merchant-page.style.scss";
import { TableRowTitle } from "../../constants/table-row.constant";
import { RoundButton, TextInput } from "../components";
import { Button } from "@mui/material";
import { I18n } from "../../translation";
import { MenuBar } from "../components/menu-bar";

const header = [
  {
    title: TableRowTitle.id,
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
    title: TableRowTitle.email,
  },
];

const bodyrow = [
  {
    content: "1",
  },
  {
    imageUrl:
      "https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/weapons/key_of_khajnisut.png?strip=all&quality=100&w=92",
  },
  {
    content: "Khoa ga",
  },
  {
    content: "0981684684",
  },
  {
    content: "khoaga@gmail.com",
  },
];

const bodyrow2 = [
  {
    content: "2",
  },
  {
    imageUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJcAawMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgMEAAIHAf/EADoQAAIBAwIDBgMHAwIHAAAAAAECAwAEEQUhEjFBBhMiUWFxgZGhFCMyUrHB8ELR4RUkM0NicnOy8f/EABkBAAMBAQEAAAAAAAAAAAAAAAIDBAEABf/EACYRAAICAgMAAQIHAAAAAAAAAAABAhEDEiExQVEUIgQFEyMyM0L/2gAMAwEAAhEDEQA/AOoV7XlaSzRxfjYCsbS7NqzfNaSyrGhdzhRzJqEXcT/gkU49aTu23aFIXWyVuFAveStnp0HzpU8qS4GQxtumWe0Hat7dCLQog58chxtXOZ9f1vUbwiByxbYcLHl50Lv7+41G4/5jK7eFSedWsXltHHa2iSNeXQ4iyDLLGdlUeWcE+xFIpvmRRajxEI2uo39hJmW9dn67HA+I/bNMmldu7i18V/i4tesitkqPofgaUn7JXkUXfahd29s7blJJDxD5fvVGXTbq0lMltcwzLjhYZyGB9PL41qcU+GY032jv1nexXcSyQuGVhkEdRVkEVxnsb2ll0qZLSXjEPFw8D84/T+1dMs9dtbjOHIxtyp8Zr0nlBroN1lQxzRyDKODUwpgBleV7XlccaTP3cTv5KTSzdtLfXsdp33dpwd7PIDghdsAfOmO6wLaXP5SK59eXD3+ovCjsIEIR+7OC5HTPkOtS/iJdFOCN2HJZdLtVMVpGZJf+lice5pD1exa5uZZeLjAbds82+PPAprAWOJ1iRVSKMthOpqoPs2m2glueE8IzwkZyeZPzzUu7soUUkAItIitbZJroEPJsF5MR5D1Pn0pkv1g7L6Q+pSRq+ozqBGMciRyHkP7UJ0p7vWddgnufDArDCcuFR09av9u2hutQxcN9xbRLwp+Zj/PrR2ZrbOdalqd3f3BkvpcxnfYD6Cqa3DJI3AzgZ2wOVMlvov29i3dnGc0Wi7LoFwYufWm7peGaNvlidFO048CMZFxwnHl0pl0O4vVkLGGZTxEh15D51aHZ6O3y24xy3qvdXUlvHwRuy45gdfhWbX0dpQ66XrByqXPCkvQg7NTbbTCRAynKnHwri9tfvxBZMSKdx6+xp97IauJIzbyEkDdWzvjyNMx5OaYjJi4tDnzrK1Rq3qknAuvX/cWcgQ8UmMADzrn8d53EJjQt3jDcnr5n4nNMHaWWOyhDSlmZ9iDvueQ58qULXUIA7S91IYwxU5XO2/nz/wA15k25S5PRxRSiHNOd5EZ2JEfBhj055+dBNTnudX1EraqDGrYQnZQAfxGjpka7t1S2BXvWAXPJRjJPyqvazafYT90gNw+c8O2Cf3oE6GU/AhYwJp1kvdtxuB4pcYyfShmqWE2q68GDEw90ufcZq1f61BfwhDcQwx537vxNgfoKLaFqWiyLwxX0JkzjDHhP1ooXsY+FZPY6XHBGFCj5VdNuoHKr/CuPCQRUMpRFLOQFHU1TQnYB6hAvC3hpL1q2K5ZRuvKmXWe1GjWrlGuTI/5Yl4sUCn1Ox1SB2s5PEvNGGCKW1yMi+KFWOZFPhJ4WJ2PRv80w6FqZt7mKYYB99qTriTgdsHGZCPY86IadcYPC2OE8xnl7Vso+oBNXTO+6bcR3VtHLEcqw+XpV2ub9jNaktZjBK3eQHB9R8P5tXRVcMoZTkHkaqx5FJEmWDhITdcSG7WRGwTGM4zzPWkReEy/c4whICnkv+aNSwXlzeRPb5Ld2zOSdsZxiqmmWMi6tIxTituIYl6Mc7Y/nT0rzuXyz0YpJUG9M+8ju4UI44YR8OJv7ChXZvSJFvtXmlxLNjgiPkTnb51vo91IusXqspELwkZx1LKAP1o32dVBd37hvH3iK2/I8O4/WsT1MbN9K0u07OaYPuVmun/GwUMWJ9T0oXfXemS3bCext0kB8Wyg/Nf3q92jtpb5e7SXYMCUzsw9aUv8AQJYrh2CrI7rwjgT8PLfbrtz2qd5tne9BQi/g6Xo9xDLaKtvyA5Z5UM7Q3qNEbUgs0hxwg86m7PWNzZGGNO7IMR4gwPFxdDnOAAOmN8jcUv6p3kOuE3LgEKQWC7EnkVHT2OaphkcsWwGq2BiS2lniRbeNY2OFc4Bf2zuRWXS2l2pkjRFlXcMBhgaraxp4vhbqFAWAEHK7yHzJ5/WttD0W4iuX3xB5HOPhU7yKtlLkar6aE3V4u6vZoiebBwfevEmkto1Lx7n8LA4Pz/vRntha21oQzrIbttoipHAFB3z164+FC9OtXvA0jbRRbHbm3lXpRknjUiNr72kGtKvGEqMPC6kHyHvXYtMvLOewgl74xcS5KGQ+E9RXJXtoraSNS3j4EOB15Z+n6UWhuJIoxHH41XYMAd6GMqdoOcNlTLT3k3EI44kMUY4mj5kjPP1qHVNWuZNQghCcIThkwBkkZG3LyqFBJJdTOD4g5QqNuEbYHtVjuZBf/aostMRgenQ1MqRQ0Ery3WC+7xBkKoYgf1MPwj54Pw9a87LIXuLyFm8bqJOIdMN4f2qlq14bSJV4Q0mwIXxcI/mK87E3vHr0kXeFu9iYgn0O9dFWbXA2xW+XKyjhY+dZMIrZSzuFUdTRWMgA5AI9aEwQjUNYYhAIYMFjjm3Sp5fl8XK7B/U+Qzp1tJH3s0qBHYBQCdwvrSd2ps83ZdAGbmN96cLpHhDyJcM3EuOFjsPakrVHupbp3aUYxjhXBAq5wjCGi6Ax23ZPp3cSWyPjBI6itryVEBAIX18q00K4jgYWrgcEn4cjO4rXWgiluBQuKh+jipbXwPu3RzXtjdG61bAGI40CoDzxuc+5JJq1oUoTT1CAExzFnHPmNj7UK1QibV5eM8I4gBkZq1bxyaffxGQkId8ryZa9KS+xRRJ/tsJM2ZkU58OyE7kDyrp/Z66hfRbQ4CngwQvLIODXLO9E7qi+GTmMen8zRqC41C0hWFS4A3wrDG+/n60EXqHOOwSSyWyiMk8ueIbkAjGefvUui3JmneRE+4JEa5G+dzn2wD86i1PvZQoCi4B8WOQBHTb9Ks2xi06zfjZWu3+84ByXbGMexqca+ULPaG6likChvv7p8AY5Dqa00i+g0ztRp5if7hCI5XI6uMfqRXmqxk63JIZLfGeAd+pxjHQ9N80N1TTJ0Rp44o1IGSYZC0bjzGSSG+nl6uxqNUDPY7rwgoceVI+v3mo6BBDfJE8unC4f7YkTcL4ztg+VFewfaAazo8YlP+6hAjlB+h+IpiltYpoHhmjV45M8StuDTVyxVtCjbdsuyVxb/wC6h1K3Z1IUTBnOc7EFWPpQnWu0nZaGNntYtQkPCvCApG+d/wARqfVuyy2zqsHdvbqfCjNwvGPIHqKF6lokE7IsoygORGhyW9D5Cubj8DlilVqRb7GSTahL9qkjMVuzhoVc5bG/M/L50S7RSpFFKxI2G9Sadi1iJwBwJgAcgaTe2mqtK62MLfeSHxY6CgrZ0jLa5YqyH7RdvMOTvtn+eVHbmBpYrZWDcY229AM1Np2mWtutvnjmuWGUhQAnP6D2O+3Kr32ieDvVMfcOPxKyjjA+P+K6U76BjCuwN3L2iq0pPH/SMVOjKygvL4jzyTWcImEksshzGM7nJY8h+tFI7hGRSw4TjcJCmPqKFsKhpvbRbaZ2hPPxbn1pa45xqM8ndu4jZRgflO1OWpKiygqCcJn3NBTaMZnKs0dxweIrtxJnakt8hwfFgK9SU3h7tSwKg8qiPFAzxSFD32E7ob4ydySOR6AevpXl/ay9wDJIFljuHjBY4LbA7fX51B30VlAty7LNLgiNgMhc7Z9TRpcBt2SaDdTaL2gSSFiykcMi/nGT9a7HZzpdQq8ZyMda4tpk6Xt7HNkKW/p+NdP0p3hiR0PTcdDTFKnTE5Ipq0FryFXTLqD7ig01iik8KKufIUVkvQy7jhPrQfULwhSE3PpRtoCG3QD1q8SyhfyHTzrmgmeXVzNMx43JI9KctcLPxFzljSXKBHfcR6AkfKux82bl+2g5b8Sr3zuwcNkMv9Pl8KOzXjajDG8aRl4xgo7cS56lT+JfbOKX7K7QY4nMcn5sZVh/PerH+qJx8Inj4c7BAFB9zS2mNWvZtPBwd5KFIjceIEZKNnP8Nbwle7XfpUtstzclu5j4oUG+Dkt7H+c6lFnbkffSXKycmVYSQD5ZzWU/Tnr4dA1Qqk4cDIYEk+w/zQe5Es6OsagPIvET1A8v55Uxa0oiCPHuoJUgetK2lzP4VLlCAUbbnj/59aHJGpUFhg3GwPqdlc3VssF1kvGwbJ3/ABZ2/wDWtIey8skYYnIPPHKj07Sz3bNG7YLf0hT+tGbNJo1HiEn/AHR4J+I/tRxRaoRUeUL1t2Uihi+0MIoXU+KQkKh8s52o1prS23FDcIe5xlJc5Cnqp6j4+oqxq4km0e8gMZQFOMEcsih+j3cjM8YUlGIZSThRkb/XNG4oW8LyJthkKrjIINUL9AiFiMnoB1qyYFzxRsY2693yPwNRXCyIpZFyfMbGs1J44Ht2KOpadd3ZYlDEh6bcR/YfWhK9nlVs9x4/zSHNPFtHK0FzLNxorDgWM7bjr9aW0i1G/eVbi4SJInMfebs7Y+mcdTmtSpcFSxRumgNcaDOzKVIXB5E1DHok6KQYxv0ztRqTTNOtwTO3esObSnjOf0FD3uCkrCwtgqA7ODjb2xXWzfp8bdtF/SZ7nTVWHHFb9YJRxp9eXwxTNpN3ptvp8UUguFYZJAY9ST5+tKdvPeSjhmtWPm64APwJq2sk6jAjuAPLeuTYE/w0ZdHRpY1lUqwyDS1cWclncyIicQYgptyNNQ2NbMitglQT60Usak7Ai9WDdPsF7kGVRxnfer4t0A/CPlUoArbFGomOTZVe3VldCBh1K/OlTSlMLAHnv9DinQjf40r6lGlnqqxfmJYfE0Ml6Owy7iFkGVrCMCtrfBQGt2WuB9K8jgPGj4wyE4896W9MdZTOGRTxSMScY60Y1eTupoCOaxZ+dC9IhIj4j1OaFjYcRsnlsYHH/DFRGxjUZKgY5CiXAcbCsW2LHeto3YEG2LvhRUn+nt5CjcdsF6VJ3Y8q6gdwk6+VYlZWU0m8N62FZWVwJhFLnbKHgazu15h+7Psd6ysoZdDML/cRd09+KFT6VbI2rKysj0FL+QF10ffR/wDiH6mtdMiHcL7V7WUPo1f1hFIhUoQLXtZRIUzxjtWmDWVlccf/2Q==",
  },
  {
    content: "Khoa ga 2",
  },
  {
    content: "098168faf",
  },
  {
    content: "khoaga2@gmail.com",
  },
];

const body = [
  {
    bodyRow: bodyrow,
  },
  {
    bodyRow: bodyrow2,
  },
];

export const MerchantPage = () => {
  return (
    <div className="merchant-page">
      <div className="page-container">
        <section className="left-content">
          <div className="label">{I18n.FARMHOME}</div>
          <MenuBar />
        </section>
        <div className="search-bar">
          {/* <TextInput label="Merchant" />
          <Button>search</Button> */}
          <div style={{ width: "75vw" }}>
            <TableRow header={header} body={body} />
          </div>
        </div>
      </div>
    </div>
  );
};
