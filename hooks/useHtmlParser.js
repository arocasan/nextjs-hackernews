import parse, { domToReact } from 'html-react-parser';

const useHtmlParser = (rawHtmlString) => {
  const options = {
    replace: ({type, name, children, attribs}) => {
      // add style to anchor/links
      if (type === "tag" && name === "a") {
        return (
          <a 
            href={attribs.href}
            target="_blank"
            className="text-brandOrange sm:underline break-all"
          >
            { domToReact(children) }
          </a>
        );
      }

      // wrap code blocks
      if (type === "tag" && name === "pre") {
        return (
          <pre className="whitespace-pre-wrap">
            { domToReact(children) }
          </pre>
        )
      }

      // hide empty elements
      if (type === "tag" && children.length === 0) {
        return (
          <></>
        )
      }
    }
  }
  
  return parse(rawHtmlString, options);
}

export { useHtmlParser }