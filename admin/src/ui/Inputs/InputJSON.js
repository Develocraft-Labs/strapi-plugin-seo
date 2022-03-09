import React, { useCallback, useMemo } from "react";
import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { InputErrors } from "strapi-helper-plugin";

const Wrap = styled.div`
  border: 1px solid ${(p) => (p.hasError ? "#dc3545" : "#e3e9f3")};
  position: relative;
`;

const MIN_SIZE = 300;
const MAX_SIZE = 900;

const InputJSON = ({
  value,
  onBlur,
  onChange,
  name,
  disabled,
  errors,
  touched,
}) => {
  const [height, setHeight] = React.useState(300);

  const updateHeight = useCallback((editor) => {
    const lines = editor.getModel()?.getLineCount() || 1;

    const contentHeight = Math.min(Math.max(MIN_SIZE, lines * 19), MAX_SIZE);
    setHeight(contentHeight);
  }, []);

  const handleBlur = useCallback(
    (editor) => {
      const currentValue = editor.getValue();
      onBlur({
        target: {
          name,
          type: "json",
          errors,
          value: currentValue,
        },
      });
    },
    [onBlur, name]
  );

  const handleMount = useCallback(
    (editor) => {
      editor.onDidBlurEditorText(() => handleBlur(editor));
      editor.onDidContentSizeChange(() => updateHeight(editor));
    },
    [handleBlur, updateHeight]
  );

  const handleChange = useCallback(
    (newValue) => {
      onChange({
        target: {
          name,
          value: newValue || null,
          type: "json",
        },
      });
    },
    [onChange, name]
  );

  // No deps since we  only get initial value
  const initial = useMemo(() => {
    if (!value) {
      return "{}";
    }
    return typeof value !== "string" ? JSON.stringify(value, null, 2) : value;
  }, []);

  return (
    <>
      <Wrap hasError={touched && errors.length > 0} style={{ height }}>
        <Editor
          name={name}
          onBlur={handleBlur}
          defaultValue={initial}
          height="100%"
          theme="vs-dark"
          onChange={handleChange}
          options={{
            readOnly: disabled,
            automaticLayout: true,
            renderWhitespace: "trailing",
            scrollBeyondLastLine: false,
          }}
          onMount={handleMount}
          language="json"
        />
      </Wrap>
      <InputErrors errors={touched ? errors : []} name={name} />
    </>
  );
};

InputJSON.defaultProps = {
  disabled: false,
  onBlur: () => {},
  onChange: () => {},
  value: null,
};

InputJSON.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default InputJSON;
