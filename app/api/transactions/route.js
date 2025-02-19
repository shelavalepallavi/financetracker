

import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = (await connectToDatabase()).db("financetracker");

    const transactions = await db.collection("transactions").find({}).toArray();

    return new Response(JSON.stringify(transactions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}



export async function POST(req) {
  try {
    const body = await req.json();
    let { date, type, amount, description, category } = body;

    if (!date || !type || !amount || !description || !category) {
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = (await connectToDatabase()).db("financetracker");
    date = new Date(date).getTime();
    const newTransaction = { date, type, amount, description, category };
    await db.collection("transactions").insertOne(newTransaction);

    return new Response(JSON.stringify({ message: "Transaction added", newTransaction }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}



export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("Received PUT data:", body);
    const { id, ...updateFields } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Transaction ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = (await connectToDatabase()).db("financetracker");
    const result = await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    return new Response(
      JSON.stringify({
        message: result.modifiedCount > 0 ? "Transaction updated" : "No changes were made",
        updatedFields: updateFields,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating transaction:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}



export async function DELETE(req) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: "Transaction ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = (await connectToDatabase()).db("financetracker");

    const result = await db.collection("transactions").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Transaction deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
