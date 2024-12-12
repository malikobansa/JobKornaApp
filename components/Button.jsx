import React from "react";

const Button = ({ style, text, addStyles }) => {
  return (
    <Pressable
      style={tw`rounded-[6px] py-4 ${
        style === "primary" ? "bg-[#130160]" : "bg-[#D6CDFE]"
      } ${addStyles}`}
    >
      <Text
        style={tw`uppercase text-[14px] font-bold ${
          style === "primary" ? "text-white" : "text-[#130160]"
        }`}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
