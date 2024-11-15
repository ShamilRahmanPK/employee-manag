


const fetchContacts = async () => {
    const response = await axios.get(API_URL);
    setContacts(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      // Add new contact
      await axios.post(API_URL, formData);
    }
    fetchContacts();
    setFormData({ id: '', name: '', email: '', state: 'Inactive' });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchContacts();
  };