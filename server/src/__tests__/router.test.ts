import app from "../server";
import request from "supertest";

describe("route request validation",  () => {
    describe("GET /product", () => {
        test("should respond with 200 when request is successful", async () => {
            const res = await request(app)
                .get("/api/product")
                .query({ q: 'Test1', limit: 12, skip: 0 })

            expect(res.status).toEqual(200);
        });

        test("should respond with 400 and correct error messages when incorrect fields supplied for create", async () => {
            const res = await request(app)
                .get("/api/product")
                .query({ })

            expect(res.status).toEqual(400);
            const errors = res.body.errors;
            expect(errors[0].msg).toEqual('Limit is required');
            expect(errors[1].msg).toEqual('Skip is required');
        });
    });

    describe("POST /product", () => {
        test("should respond with 200 when request is successful", async () => {
            const res = await request(app)
                .post("/api/product")
                .send(
                    {
                        title: "test title",
                        description: "a description",
                        price: 33.33,
                        discountPercentage: 1.22,
                        rating: 2,
                        stock: 10,
                        brand: 'Apple',
                        category: 'phone'
                    });

            expect(res.status).toEqual(200);
        });

        test("should respond with 400 and correct error messages when incorrect fields supplied", async () => {
            const res = await request(app)
                .post("/api/product").send({})

            expect(res.status).toEqual(400);
            const errors = res.body.errors;
            expect(errors[0].msg).toEqual('Title is required');
            expect(errors[1].msg).toEqual('Description is required');
            expect(errors[2].msg).toEqual('Price is required');
            expect(errors[3].msg).toEqual('Discount percentage is required');
            expect(errors[4].msg).toEqual('Rating is required');
            expect(errors[5].msg).toEqual('Stock is required');
            expect(errors[6].msg).toEqual('Brand is required');
            expect(errors[7].msg).toEqual('Category is required');
        });
    });

    describe("PUT /product", () => {
        test("should respond with 200 when request is successful", async () => {
            const res = await request(app)
                .put("/api/product/1")
                .send(
                    {
                        id: 1,
                        title: "test title",
                        description: "a description",
                        price: 33.33,
                        discountPercentage: 1.22,
                        rating: 2,
                        stock: 10,
                        brand: 'Apple',
                        category: 'phone',
                        thumbnail: 'thumbnail',
                        images: ['image-01']
                    });

            expect(res.status).toEqual(200);
        });

        test("should respond with 400 and correct error messages when incorrect fields supplied", async () => {
            const res = await request(app)
                .put("/api/product/1").send({})

            expect(res.status).toEqual(400);
            const errors = res.body.errors;
            expect(errors[0].msg).toEqual('Id is required');
            expect(errors[1].msg).toEqual('Title is required');
            expect(errors[2].msg).toEqual('Description is required');
            expect(errors[3].msg).toEqual('Price is required');
            expect(errors[4].msg).toEqual('Discount percentage is required');
            expect(errors[5].msg).toEqual('Rating is required');
            expect(errors[6].msg).toEqual('Stock is required');
            expect(errors[7].msg).toEqual('Brand is required');
            expect(errors[8].msg).toEqual('Category is required');
            expect(errors[9].msg).toEqual('Thumbnail is required');
            expect(errors[10].msg).toEqual('Images is required');
        });
    });
});
