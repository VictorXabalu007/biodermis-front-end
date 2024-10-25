import { useEffect, useState } from "react";
import { useTableData } from "../../hooks/products/useTableData";
import { TableWrapper } from "../shared/Table/table-wrapper";
import {
  Avatar,
  Button,
  Checkbox,
  Flex,
  Skeleton,
  Table,
  TableColumnType,
} from "antd";
import { TableHeaderWrapper } from "../shared/Table/table-header-wrapper";
import { REGISTER_PRODUCTS } from "../../constants/paths";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Select from "../shared/Input/select";
import { SelectLabel } from "../shared/Input/select-label";
import { CATEGORIES } from "../../constants/sessionStorageKeys";
import { useCategoryFilter } from "../../context/CategoryFilterContext/CategoryFilterContext";
import { useProductsData } from "../../hooks/products/useProductsData";
import { useTableActions } from "../../hooks/useTableActions";
import { NumericFormatter } from "../shared/Formatter/numeric-formatter";
import ExpandButton from "../shared/Button/expand-button";
import EyeButton from "../shared/Button/edit-button";
import { ProductView } from "./product-description";
import DeleteButton from "../shared/Button/delete-button";
import FilterButton from "../shared/Button/filter-button";
import { useCategoriesData } from "../../hooks/categories/useCategoriesData";
import SearchInput from "../shared/Input/search-input";
import { urlParams } from "../../util/urlParams";
import { normalizeText } from "../../functions/normalize-text";

export const ProductsTable = () => {

  const {products, setProducts, isLoading, deleteProduct,contextHolder } = useTableData();
  const [searchValue, setSearchValue] = useState("");

  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const { getCategoryNameById } = useCategoriesData();

  const { products: initialData } = useProductsData();

  const { state } = useCategoryFilter();

  const handleExpand = (record: Product) => {
    const key = record.id;
    setExpandedRowKeys((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const navigate = useNavigate();

  const dataCategories: Category[] =
    JSON.parse(sessionStorage.getItem(CATEGORIES) ?? "[]") || [];

  const { 
    getColumnSearchProps, 
    filteredData, 
    setFilteredData,
    selectedKeys,
    rowClassName,
    handleCheckboxChange,
    handleSelectAll,
    setSelectedKeys,
    isFiltered,
    clearAllFilters
    
 } =
    useTableActions({
      data: products,
      setData: setProducts,
    });

  const handleCategoriesChange = (selectedOption:string) => {

    const categoryId = selectedOption;

    if (categoryId !== "") {
      setFilteredData(initialData.filter((f) => f.categoria_ids.includes(Number(categoryId)))
      );
    } else {
      setFilteredData(initialData);
    }
    
  };

  useEffect(() => {

    if (state.categoria_id && state.categoria_id !== null) {
      setFilteredData(
        products.filter((f) => f.categoria_ids.includes(Number(state.categoria_id)))
      );
    }
    
  }, [state.categoria_id,products]);

  const handleClick = () => {
    navigate(REGISTER_PRODUCTS);
  };

  const handleEditClick = (id: number) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = (record:Product) => {
    deleteProduct.mutate(record)
    
  }

  const handleDeleteAll = () => {

    products.forEach((product) => {
      deleteProduct.mutate(product)
    });
    
    setSelectedKeys([]);

  }

  const categories = [
    {
      value: "",
      label: <SelectLabel onBold="Filtrar por: " afterBold="Todos" />,
    },
    ...dataCategories.map((d) => ({
      value: d.id,
      label: <SelectLabel onBold="Filtrar por: " afterBold={d.categoria} />,
    })),
  ];

  const columns: TableColumnType<Product>[] = [
    {
        title: () =>

          <Flex gap={5} align="center">

          
              <Checkbox
                indeterminate={selectedKeys.length > 0}
                onChange={handleSelectAll}
                />

              {selectedKeys.length > 0 &&

              <DeleteButton
                title="Deletar todos os itens selecionados"
                onDelete={handleDeleteAll}
              />

              }
            
          </Flex>
        ,
        dataIndex:'selection',
        key:1,
        render: (_,record) => (
              <Checkbox
                checked={selectedKeys.includes(record.key)}
                onChange={() => handleCheckboxChange(record.key)}
            />
        ),
    },
    {
      key: "image",
      dataIndex: "imagePath",
      render: (value) => <Avatar shape="square" src={value} />,
    },
    {
      title: "SKU",
      key: "categorias_id",
      dataIndex: "categoria_ids",
      render: (value) => getCategoryNameById(value),
    },
    {
      title: "Nome",
      key: "nome",
      dataIndex: "nome",
      sorter: (a, b) => a.nome.localeCompare(b.nome),
      ...getColumnSearchProps("nome", "Nome"),
    },
    {
      title: "Preço",
      key: "valorvenda",
      dataIndex: "valorvenda",
      sorter: (a, b) => parseFloat(a.valorvenda) - parseFloat(b.valorvenda),
      ...getColumnSearchProps("valorvenda", "Preço"),
      render: (value) => <NumericFormatter value={parseFloat(value)} />,
    },
    {
      title: "Media de vendas",
      key: "mediavvs",
      dataIndex: "mediaavs",
      sorter: (a, b) => parseFloat(a.mediaavs) - parseFloat(b.mediaavs),
    },
    {
      title: "ações",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        const isExpanded = expandedRowKeys.includes(record.id);

        return (
          <Flex gap={5} align="center">
            <ExpandButton
              onClick={() => handleExpand(record)}
              isExpanded={isExpanded}
            />
            <EyeButton onClick={() => handleEditClick(record.id)} />
            <DeleteButton onDelete={() => handleDelete(record)} />
          </Flex>
        );
      },
    },
  ];

  const onFilter = (value:string) => {

    
    const filtered = products.filter((item) => {
     
      const name = normalizeText(item.nome);
      const price = normalizeText(item.valorvenda);


      return (
        name.includes(value) || 
        price.includes(value) 

      )


    });


    setFilteredData(filtered)

  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement>)=> {
    
    const value = normalizeText(e.target.value)

    setSearchValue(e.target.value)
    urlParams.set("search", value);
    navigate({
      pathname: window.location.pathname,
      search: `${urlParams.toString()}`
    });

    onFilter(value)

  }



  useEffect(() => {

    const search = urlParams.get("search");
    

    if (search) {
      setSearchValue(search)
      onFilter(search)
    } 
  }, [products]); 


  return (
    
    <TableWrapper>
        {contextHolder}
      <TableHeaderWrapper heading="Produtos gerais">
        <Flex wrap justify="space-between" align="center">
          <Flex align="center" gap={10} className="md:flex-nowrap flex-wrap">
            <SearchInput value={searchValue} placeholder="Pesquisar por preço ou nome" onChange={handleSearch} />
            <Select
              options={categories}
              defaultValue={categories[state.default_index ?? 0]}
              onChange={(e) => {
                handleCategoriesChange(e);
              }}
              className="w-full md:w-[250px]"
            />
            <FilterButton 
              onFilterCancel={clearAllFilters}
              isFiltered={isFiltered}
            />
          </Flex>

          <Flex wrap gap={10} className="mt-3 xl:mt-0">
            <Button size="large" onClick={handleClick}>
              <Flex gap={5} align="center">
                <FaPlus />
                Cadastrar um produto
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </TableHeaderWrapper>

      {isLoading ? (
        <Skeleton />
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowClassName={rowClassName}
          scroll={{ x: 300 }}
          expandable={{
            expandedRowRender: (record) => <ProductView data={record} />,
            onExpand: (_, record) => handleExpand(record),
            expandedRowKeys,
            expandIcon: () => null,
          }}
        />
      )}
    </TableWrapper>
  );
};
