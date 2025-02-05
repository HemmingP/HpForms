import HpFormsCreation from "@/components/HpFormsCreation";
import Image from "next/image";

export default function FormCreation() {
  return (
    <div className="form-creation max-w-7xl bg-gray-500 m-auto">
      Form below:
      <HpFormsCreation
        className="bg-gray-700"
        formInfo={{
          maxPartkey: 11,
          formId: 123,
          formName: "Some form name",
          pages: [
            {
              pageName: "First",
              pageIcon: "/menu-icons/crown-svgrepo-com.svg",
              layouts: [
                {
                  columnsAmount: 3,
                  parts: [
                    {
                      variant: "input",
                      partkey: 1,
                      type: "text",
                      label: "text",
                      skip: 0,
                      span: 1,
                      placeholder: "Placeholder text...",
                    },
                    {
                      variant: "input",
                      partkey: 2,
                      type: "number",
                      label: "number",
                      skip: 0,
                      span: 1,
                    },
                    {
                      variant: "textarea",
                      partkey: 3,
                      label: "textarea",
                      skip: 0,
                      span: 1,
                    },
                  ],
                },
                {
                  columnsAmount: 3,
                  parts: [
                    {
                      variant: "input",
                      partkey: 8,
                      type: "checkbox",
                      label: "Check",
                      skip: 0,
                      span: 1,
                    },
                    {
                      variant: "input",
                      partkey: 9,
                      type: "number",
                      label: "number",
                      skip: 0,
                      span: 1,
                    },
                    {
                      variant: "textarea",
                      partkey: 10,
                      label: "textarea",
                      skip: 0,
                      span: 1,
                    },
                  ],
                },
                {
                  columnsAmount: 3,
                  parts: [
                    {
                      variant: "text",
                      partkey: 6,
                      label: "",
                      tag: "h2",
                      text: "Other details that are quite important for us to know about you.. don't be mad because we ask these questions.",
                      span: 2,
                      skip: 0,
                    },
                  ],
                },
                {
                  columnsAmount: 3,
                  parts: [
                    {
                      variant: "text",
                      partkey: 7,
                      label: "",
                      tag: "p",
                      text: "Other details that are quite important for us to know about you.. don't be mad because we ask these questions.",
                      span: 1,
                      skip: 1,
                    },
                  ],
                },
                {
                  columnsAmount: 3,
                  parts: [
                    {
                      variant: "textarea",
                      partkey: 4,
                      label: "textarea 2",
                      span: 2,
                      skip: 0,
                    },
                  ],
                },
                {
                  columnsAmount: 3,
                  parts: [
                    {
                      variant: "input",
                      partkey: 5,
                      type: "text",
                      label: "input 2",
                      span: 2,
                      skip: 1,
                    },
                  ],
                },
              ],
            },
            {
              pageName: "Second",
              pageIcon: "/frontend/menu-icons/crown-svgrepo-com.svg",
              layouts: [
                {
                  columnsAmount: 2,
                  parts: [
                    {
                      label: "another one",
                      partkey: 11,
                      variant: "input",
                      skip: 0,
                      span: 1,
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
