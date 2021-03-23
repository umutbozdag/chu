import h from "../src/vdom/h";

test("returns correct object", () => {
  expect(h("div", null, "Hello")).toStrictEqual({
    type: "div",
    props: null,
    children: ["Hello"],
  });
});
