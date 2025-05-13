import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tableRows = [
  {
    size: "لارج",
    weight: "من 40 ل 50",
    width: "45",
    length: "68",
  },
  {
    size: "اكس لارج",
    weight: "من 50 ل 65",
    width: "48",
    length: "70",
  },
  {
    size: "2اكس لارج",
    weight: "من 65 ل 75",
    width: "51",
    length: "72",
  },
  {
    size: "3اكس لارج",
    weight: "من 75 ل 85",
    width: "54",
    length: "74",
  },
  {
    size: "4اكس لارج",
    weight: "من 85 ل 95",
    width: "57",
    length: "76",
  },
  {
    size: "5اكس لارج",
    weight: "من 95 ل 110",
    width: "60",
    length: "78",
  },
  {
    size: "6اكس لارج",
    weight: "من 110 ل 120",
    width: "65",
    length: "80",
  },
  {
    size: "7اكس لارج",
    weight: "من 120 ل 130",
    width: "68",
    length: "82",
  },
  {
    size: "8اكس لارج",
    weight: "من 130 ل 140",
    width: "72",
    length: "84",
  },
];

export default function SizesTable() {
  return (
    <div className="max-w-[600px] justify-self-center rounded-lg border text-center shadow">
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>الحجم</TableHead>
            <TableHead>الوزن</TableHead>
            <TableHead>العرض</TableHead>
            <TableHead>الطول</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableRows.map((row) => (
            <TableRow key={row.size}>
              <TableCell className="font-medium">{row.size}</TableCell>
              <TableCell>{row.weight}</TableCell>
              <TableCell>{row.width}</TableCell>
              <TableCell className="text-right">{row.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
