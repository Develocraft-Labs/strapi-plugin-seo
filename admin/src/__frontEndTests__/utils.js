export const mockGlobalPagination = () => {
  return jest.mock("strapi-helper-plugin", () => {
    const Pagination = jest.fn(({ children }) => children);
    const GlobalPagination = jest.fn((props) => (
      <Pagination
        onChangeParams={props.handleParamsChange}
        params={props.params}
        count={props.count}
      >
        <div>1, 2</div>
      </Pagination>
    ));
    return { GlobalPagination: GlobalPagination };
  });
};
