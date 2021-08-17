import "./index.css";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Col } from "react-bootstrap";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^[a-zA-Z\s]*$/, "El nombre no puede contener numeros"),
  id: Yup.number()
    .required("Este campo es obligatorio")
    .typeError("Solo acepta números")
    .min(30000000, "El documento debe ser mayor a 30 millones")
    .max(60000000, "El DNI debe ser menor a 60 millones"),
  phone: Yup.number().typeError("Solo acepta números"),
  email: Yup.string()
    .email("Este correo electrónico es inválido")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .required("Este campo es obligatorio")
    .min(8, "Debe tener almenos 8 caracteres")
    .matches(/(?:.*[A-Z])/, "Debe tener al menos una mayuscula"),
  repeatPassword: Yup.string()
    .required("Este campo es obligatorio")
    .oneOf([Yup.ref("password")], "Las contraseñas son distintas"),
});

const Register = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Formik
      initialValues={{
        name: "",
        id: "",
        phone: "",
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validationSchema={RegisterSchema}
      // validateOnBlur
      /* PARA QUE FUNCIONE LA VALIDACION onBlur
      (Cuando saco el foco  de input)
       NECESITO DESCOMENTAR EL CODIGO*/
      validateOnChange //Valida a medida que voy ingresando datos en el input (en tiempo real)
      onSubmit={(values)=>console.log(values)}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <div className="formCreation">
          <Form style={{ width: "30%" }} onSubmit={handleSubmit}>
            {/* La validacion onSubmit se realiza cuando envío el formulario */}
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                placeholder="Nombre completo"
                name="name"
                onChange={handleChange("name")}
                // onBlur = {handleBlur("name")}
                value={values.name}
              />
              <Form.Text style={{ color: "red" }}>
                {/* {touched.name && */errors.name && <p>{errors.name}</p>}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>DNI</Form.Label>
              <Form.Control
                placeholder="Numero de DNI"
                name="id"
                onChange={handleChange("id")}
                // onBlur = {handleBlur("id")}
                value={values.id}
              />
              <Form.Text style={{ color: "red" }}>
                {touched.id && errors.id && <p>{errors.id}</p>}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                placeholder="Número de teléfono"
                name="phone"
                onChange={handleChange("phone")}
                // onBlur = {handleBlur("phone")}
                value={values.phone}
              />
              <Form.Text style={{ color: "red" }}>
                {touched.phone && errors.phone && <p>{errors.phone}</p>}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                placeholder="correo electronico"
                name="email"
                onChange={handleChange("email")}
                // onBlur = {handleBlur("email")}
                value={values.email}
              />
              <Form.Text style={{ color: "red" }}>
                {touched.email && errors.email && <p>{errors.email}</p>}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                placeholder="Contraseña"
                name="password"
                onChange={handleChange("password")}
                // onBlur = {handleBlur("password")}
                value={values.password}
                type={visible ? "text" : "password"}
              />
              <Form.Text style={{ color: "red" }}>
                {touched.password && errors.password && (
                  <p>{errors.password}</p>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Repita contraseña</Form.Label>
              <Form.Control
                placeholder="Repetí la contraseña"
                name="repeatPassword"
                onChange={handleChange("repeatPassword")}
                // onBlur = {handleBlur("repeatPassword")}
                value={values.repeatPassword}
                type={visible ? "text" : "password"}
              />
              <Button variant="success" onClick={() => setVisible(!visible)}>
                {visible ? "Ocultar contraseña" : "Ver contraseña"}
              </Button>
              <Form.Text style={{ color: "red" }}>
                {touched.repeatPassword && errors.repeatPassword && (
                  <p>{errors.repeatPassword}</p>
                )}
              </Form.Text>
            </Form.Group>
            <Form.Group
              as={Col}
              style={{ marginTop: "1rem", textAlign: "right" }}
            >
              <Button variant="primary" type="submit">
                Registrarme
              </Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
