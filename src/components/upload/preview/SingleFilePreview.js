import PropTypes from "prop-types";
//
import Image from "../../image";

// ----------------------------------------------------------------------

SingleFilePreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default function SingleFilePreview({ file }) {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === "string" ? file : file.path;

  console.log("imgUrl", imgUrl);
  console.log("file", file);

  return (
    <Image
      alt="file preview"
      src={URL.createObjectURL(file)}
      sx={{
        top: 8,
        left: 8,
        zIndex: 8,
        borderRadius: 1,
        position: "absolute",
        width: "calc(100% - 16px)",
        height: "calc(100% - 16px)",
      }}
    />
  );
}
