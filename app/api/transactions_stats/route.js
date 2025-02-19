

import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req)

{
  try {
    // const url = new URL(req.url);
    const url = req.nextUrl;
    const date = url.searchParams.get('date');
  
    console.log("date", date);

    const db = (await connectToDatabase()).db("financetracker");

    let startOfMonth;
    let endOfMonth;

    console.log(date);
    if(!(date == '' || date === undefined)) {
      console.log("if");
      const now = new Date(date);
  
      startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0).getTime();
      endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
    } else {
      console.log("else");
      const now = new Date();
  
      startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0).getTime();
      endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
    }

    console.log({
      "date": { "$gte": startOfMonth, "$lte": endOfMonth }
    });

    const results = await db.collection("transactions").find({
      "date": { "$gte": startOfMonth, "$lte": endOfMonth }
    }).toArray();



    let totalIncome = 0,
       totalExpense = 0;



    results.forEach(({ type, amount }) => {
      if (type === "Income") {
        totalIncome += Number(amount);
      } else if (type === "Expense") {
        totalExpense += Number(amount);
      }
    });

    const netAmount = totalIncome - totalExpense;

    const responseData = {
      totalIncome,
      totalExpense,
      netAmount: netAmount,
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("log error", error);
    console.error("Error fetching transactions:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
